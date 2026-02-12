"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";

type Props = { callbackUrl: string };

export function LoginForm({ callbackUrl }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false, // Don't auto-redirect, handle manually
      });

      if (result?.error) {
        setError("Invalid email or password.");
        setLoading(false);
        return;
      }

      if (result?.ok) {
        // Successfully authenticated, redirect to dashboard
        router.push(callbackUrl);
        router.refresh();
        return;
      }
    } catch (error) {
      console.error("Sign in error:", error);
      setError("An error occurred. Please try again.");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      {error && (
        <div className="rounded bg-red-50 p-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <div>
        <label htmlFor="email" className="block text-base font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          required
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage disabled:bg-stone/10"
        />
      </div>
      <div>
        <label htmlFor="password" className="block text-base font-medium text-ink">
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
          required
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage disabled:bg-stone/10"
        />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded bg-primary py-3 text-base font-semibold text-header hover:bg-primaryHover disabled:opacity-50 transition"
      >
        {loading ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
