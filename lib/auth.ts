import bcrypt from "bcryptjs";

const COOKIE_NAME = "selbu_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7;

function getSecret(): string {
  return process.env.AUTH_SECRET ?? "unsafe-default-change-me";
}

function base64url(data: Uint8Array): string {
  return Buffer.from(data).toString("base64url");
}

function base64urlToBytes(value: string): Uint8Array {
  const buf = Buffer.from(value, "base64url");
  const out = new Uint8Array(buf.byteLength);
  out.set(buf);
  return out;
}

async function hmacKey(): Promise<CryptoKey> {
  return crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function checkSitePassword(input: string): Promise<boolean> {
  const hash = process.env.SITE_PASSWORD_HASH;
  if (!hash) return false;
  try {
    return await bcrypt.compare(input, hash);
  } catch {
    return false;
  }
}

export function createSessionToken(): Promise<string> {
  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS;
  const payload = base64url(new TextEncoder().encode(JSON.stringify({ exp })));
  return signPayload(payload).then((sig) => `${payload}.${sig}`);
}

async function signPayload(payload: string): Promise<string> {
  const key = await hmacKey();
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(payload));
  return base64url(new Uint8Array(sig));
}

export async function verifySessionToken(token: string): Promise<boolean> {
  const [payload, sig] = token.split(".");
  if (!payload || !sig) return false;
  const valid = await verifySignature(payload, sig);
  if (!valid) return false;
  try {
    const data = JSON.parse(new TextDecoder().decode(base64urlToBytes(payload)));
    return typeof data.exp === "number" && data.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

async function verifySignature(payload: string, sig: string): Promise<boolean> {
  try {
    const key = await hmacKey();
    return await crypto.subtle.verify(
      "HMAC",
      key,
      base64urlToBytes(sig) as BufferSource,
      new TextEncoder().encode(payload)
    );
  } catch {
    return false;
  }
}

export const sessionCookieName = COOKIE_NAME;
export const sessionMaxAge = SESSION_TTL_SECONDS;