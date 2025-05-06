"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";

export const LogoutButton = () => {

  const router = useRouter();
  const form = useForm();

  async function onSubmit() {
    const {error} = await authClient.signOut();

    if(error){
      toast.error(error.message)
      return;
    }

    router.push("/")
  }
  return (
    <div className="w-12">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          control={form.control}
          name="..."
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Button size={"sm"} type="submit">Logout</Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        </form>
      </Form>
    </div>
  );
};
