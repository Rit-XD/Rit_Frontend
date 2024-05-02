"use client";

import React, { useState, useEffect } from "react";
import { SubmitButton } from "./submit-button";
import Link from "next/link";
import { useFormState } from "react-dom";
import { useUser } from "@/src/lib/user/useUser";
import { useRouter } from "next/navigation";
import { handleLogin } from "./HandleLogin";

export const LoginSteps: React.FC = () => {
  const { user } = useUser();
  const [state, action] = useFormState(handleLogin, { step: "username" });
  const router = useRouter();

  useEffect(() => {
    console.log(user, state);
    if (user) {
      router.push("/dashboard");
    }
  }, [state, user]);

  return (
    <form
      className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-background"
      action={action}
    >
      <label className="text-md" htmlFor="username">
        E-mail
      </label>
      <input
        className="px-4 py-3 bg-inherit border border-slate-200 rounded-full focus:outline-orange-500 focus:border-0 focus:outline-none"
        name="username"
        placeholder="naam@voorbeeld.com"
        required
      />

      <label className="text-md" htmlFor="password">
        Wachtwoord
      </label>

      <input
        className="rounded-full px-4 py-3 bg-inherit border border-slate-200 mb-6 focus:outline-orange-500 focus:border-0 focus:outline-none"
        type="password"
        name="password"
        placeholder="••••••••"
        required
      />

      <SubmitButton
        type="submit"
        className="px-4 py-2 text-foreground mb-2 rounded-full bg-orange-500"
        pendingText="Signing In..."
      >
        Log in
      </SubmitButton>
      <p className="px-4 py-2 text-background mb-2 self-center">
        Heb je nog geen account?{" "}
        <Link
          href="/signup"
          className="border px-4 py-2 text-background mb-2 text-orange-500 hover:underline"
        >
          Registreer je nu
        </Link>
      </p>
    </form>
  );
};
