type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelResponse = {
  status(code: number): VercelResponse;
  json(body: unknown): void;
  setHeader(name: string, value: string): void;
};

type MessageBody = {
  type?: unknown;
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  website?: unknown;
};

const projectUrl = "https://qaevcjvzttwmcgdryits.supabase.co";
const projectPublishableKey = "sb_publishable_uP0Skkl1mE-smN2TanwdtA_MoxN1kgG";

function header(request: VercelRequest, name: string) {
  const value = request.headers[name];
  return Array.isArray(value) ? value[0] : value || "";
}

function decodeHeader(value: string) {
  try { return decodeURIComponent(value); } catch { return value; }
}

function text(value: unknown, limit: number) {
  return typeof value === "string" ? value.trim().slice(0, limit) : "";
}

export default async function submitMessage(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const body = (request.body && typeof request.body === "object" ? request.body : {}) as MessageBody;
  if (text(body.website, 200)) {
    response.status(201).json({ ok: true });
    return;
  }

  const type = body.type === "contact" ? "contact" : body.type === "anonymous" ? "anonymous" : "";
  const message = text(body.message, 4000);
  const name = text(body.name, 120);
  const email = text(body.email, 254).toLowerCase();
  const subject = text(body.subject, 160);
  if (!type || message.length < 2) {
    response.status(400).json({ error: "Please enter a message." });
    return;
  }
  if (type === "contact" && (name.length < 2 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))) {
    response.status(400).json({ error: "Please enter a valid name and email." });
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || projectUrl;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || projectPublishableKey;

  const forwardedFor = header(request, "x-vercel-forwarded-for") || header(request, "x-forwarded-for") || header(request, "x-real-ip");
  const ipAddress = forwardedFor.split(",")[0]?.trim();
  if (!ipAddress) {
    response.status(422).json({ error: "Unable to verify this request." });
    return;
  }

  const country = header(request, "x-vercel-ip-country").toUpperCase();
  const region = decodeHeader(header(request, "x-vercel-ip-country-region"));
  const city = decodeHeader(header(request, "x-vercel-ip-city"));
  const userAgent = header(request, "user-agent").slice(0, 1024);

  try {
    const upstream = await fetch(`${supabaseUrl}/functions/v1/submit-message`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${anonKey}`,
        "apikey": anonKey,
        "content-type": "application/json",
        "origin": "https://www.mahim.live",
        "x-message-client-ip": ipAddress,
        ...(country ? { "x-message-country": country } : {}),
        ...(region ? { "x-message-region": region } : {}),
        ...(city ? { "x-message-city": city } : {}),
        ...(userAgent ? { "x-message-user-agent": userAgent } : {}),
      },
      body: JSON.stringify({
        type,
        message,
        ...(type === "contact" ? { name, email, subject: subject || null } : {}),
      }),
    });
    const result = await upstream.json().catch(() => ({})) as { error?: string };
    if (!upstream.ok) {
      console.error("Message upstream failed", upstream.status);
      response.status(upstream.status === 429 ? 429 : upstream.status >= 400 && upstream.status < 500 ? upstream.status : 502)
        .json({ error: result.error || "Unable to send your message right now." });
      return;
    }
    response.status(201).json({ ok: true });
  } catch (error) {
    console.error("Message proxy failed", error instanceof Error ? error.message : error);
    response.status(500).json({ error: "Unable to send your message right now." });
  }
}
