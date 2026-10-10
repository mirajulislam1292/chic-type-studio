type VercelRequest = {
  method?: string;
  headers: Record<string, string | string[] | undefined>;
  body?: unknown;
};

type VercelResponse = {
  status(code: number): VercelResponse;
  json(body: unknown): void;
  end(): void;
  setHeader(name: string, value: string): void;
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

export default async function trackVisitor(request: VercelRequest, response: VercelResponse) {
  response.setHeader("Cache-Control", "no-store");
  if (request.method !== "POST") {
    response.status(405).json({ error: "Method not allowed" });
    return;
  }

  const supabaseUrl = process.env.VITE_SUPABASE_URL || projectUrl;
  const anonKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || projectPublishableKey;

  const forwardedFor = header(request, "x-vercel-forwarded-for") || header(request, "x-forwarded-for") || header(request, "x-real-ip");
  const ipAddress = forwardedFor.split(",")[0]?.trim();
  const country = header(request, "x-vercel-ip-country").toUpperCase();
  const region = decodeHeader(header(request, "x-vercel-ip-country-region"));
  const city = decodeHeader(header(request, "x-vercel-ip-city"));

  try {
    const upstream = await fetch(`${supabaseUrl}/functions/v1/track-visitor`, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${anonKey}`,
        "apikey": anonKey,
        "content-type": "application/json",
        "origin": "https://www.mahim.live",
        ...(ipAddress ? { "x-analytics-client-ip": ipAddress } : {}),
        ...(country ? { "x-analytics-country": country } : {}),
        ...(region ? { "x-analytics-region": region } : {}),
        ...(city ? { "x-analytics-city": city } : {}),
      },
      body: JSON.stringify(request.body || {}),
    });
    if (!upstream.ok) {
      console.error("Visitor tracking upstream failed", upstream.status);
      response.status(502).json({ error: "Tracking unavailable" });
      return;
    }
    response.status(204).end();
  } catch (error) {
    console.error("Visitor tracking proxy failed", error instanceof Error ? error.message : error);
    response.status(500).json({ error: "Tracking unavailable" });
  }
}
