import { createClient } from "@supabase/supabase-js";

type MessagePayload = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
};

const corsHeaders = {
  "Access-Control-Allow-Origin": "https://www.mahim.live",
  "Access-Control-Allow-Headers": "authorization, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
};

function clientIp(request: Request) {
  const direct = request.headers.get("x-message-client-ip") || request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return direct || forwarded || null;
}

function countryName(code: string | null) {
  if (!code || !/^[A-Z]{2}$/.test(code)) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

function optionalText(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) || null : null;
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response(null, { status: 204, headers: corsHeaders });
  if (request.method !== "POST") return Response.json({ error: "Method not allowed" }, { status: 405, headers: corsHeaders });

  try {
    const payload = (await request.json()) as MessagePayload;
    const messageType = payload.type === "contact" ? "contact" : payload.type === "anonymous" ? "anonymous" : null;
    const message = optionalText(payload.message, 4000);
    const name = optionalText(payload.name, 120);
    const email = optionalText(payload.email, 254)?.toLowerCase() || null;
    const subject = optionalText(payload.subject, 160);
    if (!messageType || !message || message.length < 2) {
      return Response.json({ error: "Please enter a message." }, { status: 400, headers: corsHeaders });
    }
    if (messageType === "contact" && (!name || name.length < 2 || !email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
      return Response.json({ error: "Please enter a valid name and email." }, { status: 400, headers: corsHeaders });
    }

    const ipAddress = clientIp(request);
    if (!ipAddress) return Response.json({ error: "Unable to verify this request." }, { status: 422, headers: corsHeaders });

    const rawCountryCode = (request.headers.get("x-message-country") || "").toUpperCase();
    const countryCode = /^[A-Z]{2}$/.test(rawCountryCode) ? rawCountryCode : null;
    const region = optionalText(request.headers.get("x-message-region"), 160);
    const city = optionalText(request.headers.get("x-message-city"), 160);
    const userAgent = optionalText(request.headers.get("x-message-user-agent"), 1024);

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Server configuration is incomplete");

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.rpc("record_inbound_message", {
      p_message_type: messageType,
      p_message: message,
      p_ip_address: ipAddress,
      p_name: messageType === "contact" ? name : null,
      p_email: messageType === "contact" ? email : null,
      p_subject: messageType === "contact" ? subject : null,
      p_user_agent: userAgent,
      p_country_code: countryCode,
      p_country: countryName(countryCode),
      p_region: region,
      p_city: city,
    });
    if (error) {
      if (error.message.includes("Too many messages")) {
        return Response.json({ error: "Too many messages. Please try again in a few minutes." }, { status: 429, headers: corsHeaders });
      }
      throw error;
    }

    return Response.json({ ok: true }, { status: 201, headers: corsHeaders });
  } catch (error) {
    console.error("Message submission failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "Unable to send your message right now." }, { status: 500, headers: corsHeaders });
  }
});
