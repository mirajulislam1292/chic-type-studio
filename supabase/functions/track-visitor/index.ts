import { createClient } from "npm:@supabase/supabase-js@2.57.4";

type TrackingPayload = { path?: unknown; referrer?: unknown };

const corsHeaders = (origin: string | null) => ({
  "Access-Control-Allow-Origin": origin || "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Vary": "Origin",
});

function allowedOrigin(origin: string | null) {
  const configured = (Deno.env.get("ANALYTICS_ALLOWED_ORIGINS") || "")
    .split(",")
    .map((value) => value.trim())
    .filter(Boolean);
  return !origin || configured.length === 0 || configured.includes(origin);
}

function clientIp(request: Request) {
  const direct = request.headers.get("cf-connecting-ip") || request.headers.get("x-real-ip");
  const forwarded = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return direct || forwarded || null;
}

function parseUserAgent(userAgent: string) {
  let browser = "Other";
  if (/Edg\//i.test(userAgent)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(userAgent)) browser = "Opera";
  else if (/Chrome\//i.test(userAgent)) browser = "Chrome";
  else if (/Firefox\//i.test(userAgent)) browser = "Firefox";
  else if (/Safari\//i.test(userAgent)) browser = "Safari";

  let operatingSystem = "Other";
  if (/Windows NT/i.test(userAgent)) operatingSystem = "Windows";
  else if (/Android/i.test(userAgent)) operatingSystem = "Android";
  else if (/iPhone|iPad|iPod/i.test(userAgent)) operatingSystem = "iOS";
  else if (/Mac OS X/i.test(userAgent)) operatingSystem = "macOS";
  else if (/Linux/i.test(userAgent)) operatingSystem = "Linux";

  let deviceType = "Desktop";
  if (/bot|crawler|spider|crawling/i.test(userAgent)) deviceType = "Bot";
  else if (/iPad|Tablet/i.test(userAgent)) deviceType = "Tablet";
  else if (/Mobi|Android|iPhone|iPod/i.test(userAgent)) deviceType = "Mobile";

  return { browser, operatingSystem, deviceType };
}

function countryName(code: string | null) {
  if (!code || !/^[A-Z]{2}$/.test(code)) return null;
  try {
    return new Intl.DisplayNames(["en"], { type: "region" }).of(code) || code;
  } catch {
    return code;
  }
}

Deno.serve(async (request) => {
  const origin = request.headers.get("origin");
  const cors = corsHeaders(origin);

  if (request.method === "OPTIONS") {
    return new Response(null, { status: allowedOrigin(origin) ? 204 : 403, headers: cors });
  }
  if (request.method !== "POST") {
    return Response.json({ error: "Method not allowed" }, { status: 405, headers: cors });
  }
  if (!allowedOrigin(origin)) {
    return Response.json({ error: "Origin not allowed" }, { status: 403, headers: cors });
  }

  try {
    const payload = (await request.json()) as TrackingPayload;
    const path = typeof payload.path === "string" ? payload.path.slice(0, 2048) : "";
    const referrer = typeof payload.referrer === "string" ? payload.referrer.slice(0, 2048) : null;
    if (!path.startsWith("/") || path.startsWith("/admin") || path.includes("://")) {
      return Response.json({ error: "Invalid path" }, { status: 400, headers: cors });
    }

    const ipAddress = clientIp(request);
    if (!ipAddress) {
      return Response.json({ error: "IP unavailable" }, { status: 422, headers: cors });
    }

    const userAgent = (request.headers.get("user-agent") || "").slice(0, 1024);
    const { browser, operatingSystem, deviceType } = parseUserAgent(userAgent);
    const rawCountryCode = (
      request.headers.get("cf-ipcountry") || request.headers.get("x-vercel-ip-country") || ""
    ).toUpperCase();
    const countryCode = /^[A-Z]{2}$/.test(rawCountryCode) ? rawCountryCode : null;
    const region = request.headers.get("x-vercel-ip-country-region")?.slice(0, 160) || null;
    const city = request.headers.get("x-vercel-ip-city")?.slice(0, 160) || null;

    const supabaseUrl = Deno.env.get("SUPABASE_URL");
    const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
    if (!supabaseUrl || !serviceRoleKey) throw new Error("Server configuration is incomplete");

    const supabase = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { error } = await supabase.rpc("record_visitor_event", {
      p_ip_address: ipAddress,
      p_path: path,
      p_referrer: referrer,
      p_user_agent: userAgent || null,
      p_browser: browser,
      p_operating_system: operatingSystem,
      p_device_type: deviceType,
      p_country_code: countryCode,
      p_country: countryName(countryCode),
      p_region: region,
      p_city: city,
    });
    if (error) throw error;

    return new Response(null, { status: 204, headers: cors });
  } catch (error) {
    console.error("Visitor tracking failed", error instanceof Error ? error.message : error);
    return Response.json({ error: "Unable to record visit" }, { status: 500, headers: cors });
  }
});
