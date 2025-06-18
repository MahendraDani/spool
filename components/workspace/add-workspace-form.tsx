"use client"
import { useForm } from "react-hook-form";
import { ResponsiveModal } from "../responsive-modal";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { ZCreateWorkspaceSchema } from "@/lib/zod";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import { LoadingCircle } from "../icons/loading-circle";
import { useSession } from "@/hooks/use-session";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export const AddWorkspaceForm = ({
  setShowWorkspaceDropdown,
}: {
  setShowWorkspaceDropdown: (open: boolean) => void;
}) => {
  const form = useForm<z.infer<typeof ZCreateWorkspaceSchema>>({
    defaultValues: {
      name: "",
      description: "",
      slug: "",
    },
    resolver: zodResolver(ZCreateWorkspaceSchema),
  });
  const { isMobile } = useMediaQuery();
  const { session } = useSession();
  const router = useRouter();

  async function onSubmit(values: z.infer<typeof ZCreateWorkspaceSchema>) {
    try {
      const res = await fetch(`/api/workspaces`, {
        method: "POST",
        headers: {
          Cookie: `Bearer spool.session_token=${session.token}`,
        },
        body: JSON.stringify(values),
      });

      const response = await res.json();
      if (!res.ok) {
        console.log(response);
        toast.error(response.error.message);
        return;
      }
      setShowWorkspaceDropdown(false);
      router.push(`/${response.data.slug}`);
    } catch (error) {
      console.log(error);
      toast.error("Failed to create workspace. Please try again.");
    }
  }

  return (
    <ResponsiveModal.Content className="p-0 md:w-md">
      <ResponsiveModal.Header className="bg-accent p-4 rounded-tr-md rounded-tl-md">
        <ResponsiveModal.Title>Create Workspace</ResponsiveModal.Title>
        <ResponsiveModal.Description>
          A workspace is where you bring order to your code snippets. It enables
          you to group snippets into folders for easy access and management.
        </ResponsiveModal.Description>
      </ResponsiveModal.Header>
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
                      <Input placeholder="Personal Space" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="personal-space" {...field} />
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
                        placeholder="Add description for your workspace (optional)."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">
                {(form.formState.isSubmitting ||
                  form.formState.isValidating) && <LoadingCircle />}
                {form.formState.isSubmitting || form.formState.isValidating ? (
                  <span>Creating...</span>
                ) : (
                  <span>Create</span>
                )}
              </Button>
            </fieldset>
          </form>
        </Form>
      </section>
    </ResponsiveModal.Content>
  );
};
