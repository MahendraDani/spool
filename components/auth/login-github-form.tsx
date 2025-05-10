"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { GithubIcon } from "../icons/github";
import { authClient } from "@/lib/auth-client";
import { useState } from "react";
import { toast } from "sonner";
import { LoadingCircle } from "../icons/loading-circle";

export const LoginWithGitHubForm = () => {
  const form = useForm();
  const [isPending, setIsPending] = useState(false);

  async function onSubmit() {
    await authClient.signIn.social(
      {
        provider: "github",
        callbackURL: "/onboard", 
        newUserCallbackURL : "/onboard"
      },
      {
        onRequest: () => {
          setIsPending(true);
        },
        onError: (ctx) => {
          setIsPending(false);
          toast.error(ctx.error.message);
        },
        onSuccess: () => {
          setIsPending(false);
          toast.success("Logged in successfully")
          // auto redirects to callbackURL on success
        },
      }
    );
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset disabled={isPending}>
          <FormField
            control={form.control}
            name="..."
            render={() => (
              <FormItem>
                <FormLabel />
                <FormControl>
                  <Button
                    type="submit"
                    variant={"outline"}
                    className="flex justify-center items-center gap-2"
                  >
                    {isPending || form.formState.isSubmitting || form.formState.isSubmitSuccessful? (
                      <LoadingCircle />
                    ) : (
                      <div className="flex justify-center items-center gap-2">
                        <GithubIcon />
                        <span>Continue with GitHub</span>
                      </div>
                    )}
                  </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </fieldset>
      </form>
    </Form>
  );
};
