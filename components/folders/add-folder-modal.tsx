"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { ReactNode } from "react";
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

const AddFolderModalTrigger = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <DrawerTrigger asChild>{children}</DrawerTrigger>;
  }
  return <DialogTrigger asChild>{children}</DialogTrigger>;
};

export const AddFolderModal = ({ children }: { children: ReactNode }) => {
  
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <Drawer>{children}</Drawer>;
  }

  return <Dialog>{children}</Dialog>;
};

const AddFolderModalContent = () => {
  const { isMobile } = useMediaQuery();
  const { slug } = useParams() as {
    slug: string;
  };
  const { session } = useSession();

  const form = useForm<z.infer<typeof ZCreateFolderSchema>>({
    resolver: zodResolver(ZCreateFolderSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
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

    if (!res.ok) {
      toast.error("some error");
    }

    const response = await res.json();
    console.log(response);
  }

  if (isMobile) {
    return (
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Create new folder</DrawerTitle>
          <DrawerDescription>
            Folders can be utilized to organize and manage related snippets,
            facilitating easier access and administration.
          </DrawerDescription>
        </DrawerHeader>
        <section className="p-4">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 px-6 mb-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Project Ideas" {...field} />
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
                      <Input placeholder="project-ideas" {...field} />
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
                        placeholder="Snippets for my crazy thoughts"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Create Folder</Button>
            </form>
          </Form>
        </section>
      </DrawerContent>
    );
  }

  return (
    <DialogContent className="p-0 w-md">
      <DialogHeader className="bg-secondary p-6 rounded-tr-sm rounded-tl-sm">
        <DialogTitle>Create new folder</DialogTitle>
        <DialogDescription>
          Folders can be utilized to organize and manage related snippets,
          facilitating easier access and administration.
        </DialogDescription>
      </DialogHeader>
      <section className="p-4">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 px-12 mb-6"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Project Ideas" {...field} />
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
                    <Input placeholder="project-ideas" {...field} />
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
                      placeholder="Snippets for my crazy thoughts"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="w-full">Create Folder</Button>
          </form>
        </Form>
      </section>
    </DialogContent>
  );
};

AddFolderModal.Content = AddFolderModalContent;
AddFolderModal.Trigger = AddFolderModalTrigger;
