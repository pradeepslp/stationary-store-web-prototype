"use client";

import { signOut } from "next-auth/react";

export function SignOutLink() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/" })}
      className="text-sm font-medium text-ink/70 hover:text-ink transition"
    >
      Log out
    </button>
  );
}
