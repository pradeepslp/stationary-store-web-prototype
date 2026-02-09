"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

type Props = { callbackUrl: string };

export function LoginForm({ callbackUrl }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl,
        redirect: true,
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="block text-base font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
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
          required
          className="mt-1 w-full rounded border border-stone/30 bg-white px-3 py-2 text-base text-ink focus:border-sage focus:outline-none focus:ring-1 focus:ring-sage"
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
