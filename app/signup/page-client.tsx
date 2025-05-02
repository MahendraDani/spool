"use client";
import { authClient } from "@/lib/auth-client";
import { FormEvent } from "react";

export const SignUpForm = () => {

  const handleForm = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const email = form.get("email") as string;
    const password = form.get("password") as string;
    const name = form.get("name") as string;

    const { data, error } = await authClient.signUp.email(
      {
        email, // user email address
        password, // user password -> min 8 characters by default
        name, // user display name
        callbackURL: "/dashboard", // A URL to redirect to after the user verifies their email (optional)
      },
      {
        onRequest: (ctx) => {
          //show loading
          console.log(ctx);
        },
        onSuccess: (ctx) => {
          //redirect to the dashboard or sign in page
          console.log(ctx);
        },
        onError: (ctx) => {
          // display the error message
          alert(ctx.error.message);
        },
      }
    );
    console.log(data);
    console.log(error);
  };

  return (
    <form onSubmit={handleForm} className="p-4">
      <fieldset className="flex flex-col gap-4">
        <input type="text" name="name" placeholder="Name" required />
        <input type="email" name="email" placeholder="Email" required />
        <input
          name="password"
          placeholder="Password"
          required
        />
      </fieldset>
      <button type="submit">Sign Up</button>
    </form>
  );
};
