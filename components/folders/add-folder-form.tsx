"use client";
import { ZCreateFolderSchema } from "@/lib/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { useParams } from "next/navigation";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";
import React from "react";
import { mutate } from "swr";
import { useResponsiveModalContext } from "../responsive-modal";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { LoadingCircle } from "../icons/loading-circle";

export const AddFolderModalForm = () => {
  const { isMobile } = useMediaQuery();
  const { slug } = useParams() as {
    slug: string;
  };
  const { session } = useSession();
  const { setShowResponsiveModal } = useResponsiveModalContext();

  const form = useForm<z.infer<typeof ZCreateFolderSchema>>({
    resolver: zodResolver(ZCreateFolderSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  async function onSubmit(values: z.infer<typeof ZCreateFolderSchema>) {
    const res = await fetch(`/api/folders?slug=${slug}`, {
      method: "POST",
      headers: {
        Cookie: `Bearer spool.session_token=${session.token}`,
      },
      body: JSON.stringify(values),
    });

    const response = await res.json();
    if (!res.ok) {
      console.log(response)
      toast.error(response.error.message);
      return;
    }

    mutate(`/api/folders?slug=${slug}`);
    mutate(`/api/workspaces/${slug}`);
    toast.success("Folder created successfully");
    form.reset();
    setShowResponsiveModal(false);
  }
  return (
    <section className="p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            disabled={form.formState.isSubmitting}
            className={cn("space-y-6 mb-6", isMobile ? "px-6" : "px-12")}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Rust snippets" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Add description for your folder (optional)."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">
              {(form.formState.isSubmitting || form.formState.isValidating) && (
                <LoadingCircle />
              )}
              {form.formState.isSubmitting || form.formState.isValidating ? (
                <span>Creating Folder...</span>
              ) : (
                <span>Create Folder</span>
              )}
            </Button>
          </fieldset>
        </form>
      </Form>
    </section>
  );
};
