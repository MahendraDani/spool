"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export const LoginForm = () => {
  const [pending, setPending] = useState(false);
  const router = useRouter();
  const handleCredentialLoginForm = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!email || !password) {
      alert("Email and password are required");
      return;
    }

    await authClient.signIn.email(
      {
        email,
        password,
      },
      {
        onRequest: (ctx) => {
          setPending(true);
          console.log(ctx);
        },
        onError : (ctx) =>{
          setPending(false);
          alert(ctx.error.message);
        },
        onSuccess : (ctx)=>{
          console.log(ctx);
          setPending(false);
          router.push("/dashboard");
        }
      }
    );
  };
  return <div>
    <form onSubmit={handleCredentialLoginForm}>
      <fieldset>
        <input name="email" type="email" required placeholder="Email" />
        <input
          name="password"
          type="password"
          required
          placeholder="Password"
        />
        <button disabled={pending}>{pending ? "Submitting..." : "Login"}</button>
      </fieldset>
    </form>
    <br />
  </div>;
};
