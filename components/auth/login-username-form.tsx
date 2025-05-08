"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { LoadingCircle } from "../icons/loading-circle";

const formSchema = z.object({
  username: z
    .string()
    .min(3, { message: "Username must be at least 3 characters long." })
    .max(30, { message: "Username must be at most 30 characters long." })
    .refine((val) => /^[a-zA-Z0-9._-]+$/.test(val), {
      message:
        "Username can only contain letters, numbers, underscores (_), periods (.), or hyphens (-).",
    })
    .refine((val) => /^[a-zA-Z0-9]/.test(val), {
      message: "Username must start with a letter or number.",
    })
    .refine((val) => /[a-zA-Z0-9]$/.test(val), {
      message: "Username must end with a letter or number.",
    })
    .refine((val) => !/([_.-])\1/.test(val), {
      message: "Username cannot contain consecutive special characters like __ or .. or --.",
    }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long." })
    .refine((val) => /[A-Z]/.test(val), {
      message: "Password must include at least one uppercase letter.",
    })
    .refine((val) => /[a-z]/.test(val), {
      message: "Password must include at least one lowercase letter.",
    })
    .refine((val) => /[0-9]/.test(val), {
      message: "Password must include at least one number.",
    })
    .refine((val) => /[^A-Za-z0-9]/.test(val), {
      message: "Password must include at least one special character.",
    }),
});

type FormSchemaType = z.infer<typeof formSchema>;

export const LoginWithUsernameForm = () => {
  const router = useRouter();

  const form = useForm<FormSchemaType>({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: zodResolver(formSchema),
  });

  async function onSubmit({ username, password }: FormSchemaType) {
     await authClient.signIn.username(
      {
        username,
        password,
      },
      {
        onError: (ctx) => {
          toast.error(ctx.error.message);
        },
        onSuccess : ()=>{
          toast.success("Logged in successfully");
          router.push("/dashboard")
        }
      }
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <fieldset className="flex flex-col gap-2" disabled={form.formState.isSubmitting}>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormDescription className="-my-1">
                  Username
                </FormDescription>
                <FormControl>
                  <Input placeholder="raydalio" {...field} />
                </FormControl>
                <FormMessage className="-my-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel />
                <FormDescription className="-my-1">Password</FormDescription>
                <FormControl>
                  <Input type="password" placeholder="********" {...field} />
                </FormControl>
                <FormMessage className="-my-1" />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 flex justify-center items-center">
            {form.formState.isSubmitting ? <LoadingCircle/> : "Login"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
};
