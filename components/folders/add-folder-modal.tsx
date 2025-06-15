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
import React from "react";
import { mutate } from "swr";

const AddFolderModalTrigger = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <DrawerTrigger asChild>{children}</DrawerTrigger>;
  }
  return <DialogTrigger asChild>{children}</DialogTrigger>;
};

type TAddFolderModalContext = {
  showAddFolderModal: boolean;
  setShowAddFolderModal: (open: boolean) => void;
};

const AddFolderModalContext = React.createContext<TAddFolderModalContext | undefined>(undefined);

export const AddFolderModal = ({ children }: { children: ReactNode }) => {
  const [showAddFolderModal, setShowAddFolderModal] = React.useState(false);
  const { isMobile } = useMediaQuery();
  
  const contextValue = React.useMemo(() => ({ showAddFolderModal, setShowAddFolderModal }), [showAddFolderModal]);

  if (isMobile) {
    return (
      <AddFolderModalContext.Provider value={contextValue}>
        <Drawer open={showAddFolderModal} onOpenChange={setShowAddFolderModal}>
          {children}
        </Drawer>
      </AddFolderModalContext.Provider>
    );
  }

  return (
    <AddFolderModalContext.Provider value={contextValue}>
      <Dialog open={showAddFolderModal} onOpenChange={setShowAddFolderModal}>
        {children}
      </Dialog>
    </AddFolderModalContext.Provider>
  );
};

const useAddFolderModalContext = () => {
  const context = React.useContext(AddFolderModalContext);
  if (!context) {
    throw new Error('useAddFolderModal must be used within AddFolderModal');
  }
  return context;
};

const AddFolderModalContent = () => {
  const { isMobile } = useMediaQuery();
  const { slug } = useParams() as {
    slug: string;
  };
  const { session } = useSession();
  const { setShowAddFolderModal } = useAddFolderModalContext();

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
      return;
    }

    const response = await res.json();
    mutate(`/api/folders?slug=${slug}`);
    mutate(`/api/workspaces/${slug}`);
    console.log(response);
    toast.success("Folder created successfully");
    form.reset();
    setShowAddFolderModal(false);
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
