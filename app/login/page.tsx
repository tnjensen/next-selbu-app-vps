import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import {
  checkSitePassword,
  createSessionToken,
  sessionCookieName,
  sessionMaxAge,
} from "@/lib/auth";

export const metadata: Metadata = {
  title: "Logg inn",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  return (
    <div className="container flex flex-col gap-6">
      <h1 className="text-3xl text-center">Logg inn</h1>
      {params?.error && (
        <p className="text-red-600 text-center">Feil passord. Prøv igjen.</p>
      )}
      <form
        action={async (formData: FormData) => {
          "use server";
          const password = String(formData.get("password") ?? "");
          if (await checkSitePassword(password)) {
            const token = await createSessionToken();
            (await cookies()).set(sessionCookieName, token, {
              httpOnly: true,
              sameSite: "lax",
              secure: process.env.NODE_ENV === "production",
              path: "/",
              maxAge: sessionMaxAge,
            });
            redirect("/");
          }
          redirect("/login?error=1");
        }}
        className="flex flex-col gap-4 max-w-sm mx-auto w-full"
      >
        <label htmlFor="password" className="flex flex-col gap-1">
          Passord
          <input
            id="password"
            name="password"
            type="password"
            required
            autoFocus
            className="border border-gray-300 rounded-md px-3 py-2 bg-white text-black"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white rounded-md px-4 py-2 hover:bg-blue-700"
        >
          Logg inn
        </button>
      </form>
    </div>
  );
}