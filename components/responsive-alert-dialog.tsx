"use client";
import { useMediaQuery } from "@/hooks/use-media-query";
import {
  ComponentProps,
  createContext,
  ReactNode,
  useContext,
  useMemo,
  useState,
} from "react";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";

type TResponsiveAlertDialogContext = {
  showResponsiveAlertDialog: boolean;
  setShowResponsiveAlertDialog: (open: boolean) => void;
};

const ResponsiveAlertDialogContext = createContext<
  TResponsiveAlertDialogContext | undefined
>(undefined);

export const useResponsiveAlertDialogContext = () => {
  const context = useContext(ResponsiveAlertDialogContext);

  if (context === undefined) {
    throw new Error(
      "useResponsiveAlertDialogContext must be used within ResponsiveAlertDialog.Provider"
    );
  }
  return context;
};

export const ResponsiveAlertDialog = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [showResponsiveAlertDialog, setShowResponsiveAlertDialog] =
    useState(false);
  const { isMobile } = useMediaQuery();

  const contextValue = useMemo(
    () => ({ showResponsiveAlertDialog, setShowResponsiveAlertDialog }),
    [showResponsiveAlertDialog]
  );

  if (isMobile) {
    return (
      <ResponsiveAlertDialogContext.Provider value={contextValue}>
        <Drawer
          open={showResponsiveAlertDialog}
          onOpenChange={setShowResponsiveAlertDialog}
        >
          {children}
        </Drawer>
      </ResponsiveAlertDialogContext.Provider>
    );
  }

  return (
    <ResponsiveAlertDialogContext.Provider value={contextValue}>
      <AlertDialog
        open={showResponsiveAlertDialog}
        onOpenChange={setShowResponsiveAlertDialog}
      >
        {children}
      </AlertDialog>
    </ResponsiveAlertDialogContext.Provider>
  );
};

const ResponsiveAlertDialogTrigger = ({
  asChild = false,
  children,
  className,
}: {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return (
      <DrawerTrigger asChild={asChild} className={cn(className)}>
        {children}
      </DrawerTrigger>
    );
  }

  return (
    <AlertDialogTrigger asChild={asChild} className={cn("cursor-pointer",className)}>
      {children}
    </AlertDialogTrigger>
  );
};

const ResponsiveAlertDialogContent = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <DrawerContent className={cn(className)}>{children}</DrawerContent>;
  }

  return (
    <AlertDialogContent className={cn(className)}>
      {children}
    </AlertDialogContent>
  );
};

const ResponsiveAlertDialogHeader = ({
  children,
  className,
  ...props
}: ComponentProps<"div">) => {
  const { isMobile } = useMediaQuery();

  if (isMobile) {
    <DrawerHeader className={cn(className)} {...props}>
      {children}
    </DrawerHeader>;
  }

  return (
    <AlertDialogHeader className={cn(className)} {...props}>
      {children}
    </AlertDialogHeader>
  );
};

// TODO : How to pass down the props of both DrawerTitle and DialogTitle?
const ResponsiveAlertDialogTitle = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <DrawerTitle className={className}>{children}</DrawerTitle>;
  }

  return (
    <AlertDialogTitle className={cn(className)}>{children}</AlertDialogTitle>
  );
};

const ResponsiveAlertDialogDescription = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return (
      <DrawerDescription className={className}>{children}</DrawerDescription>
    );
  }

  return (
    <AlertDialogDescription className={cn(className)}>
      {children}
    </AlertDialogDescription>
  );
};

const ResponsiveAlertDialogFooter = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return <DrawerFooter className={className}>{children}</DrawerFooter>;
  }

  return (
    <AlertDialogFooter className={cn(className)}>{children}</AlertDialogFooter>
  );
};

const ResponsiveAlertDialogAction = ({
  asChild = false,
  children,
  className,
}: {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return (
      <Button asChild={asChild} className={className}>
        {children}
      </Button>
    );
  }

  return (
    <AlertDialogAction asChild={asChild} className={cn(className)}>
      {children}
    </AlertDialogAction>
  );
};


const ResponsiveAlertDialogClose = ({
  asChild = false,
  children,
  className,
}: {
  asChild?: boolean;
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return (
      <DrawerClose asChild={asChild} className={className}>
        {children}
      </DrawerClose>
    );
  }

  return (
    <AlertDialogCancel asChild={asChild} className={cn(className)}>
      {children}
    </AlertDialogCancel>
  );
};

ResponsiveAlertDialog.Trigger = ResponsiveAlertDialogTrigger;
ResponsiveAlertDialog.Content = ResponsiveAlertDialogContent;
ResponsiveAlertDialog.Header = ResponsiveAlertDialogHeader;
ResponsiveAlertDialog.Title = ResponsiveAlertDialogTitle;
ResponsiveAlertDialog.Description = ResponsiveAlertDialogDescription;
ResponsiveAlertDialog.Footer = ResponsiveAlertDialogFooter;
ResponsiveAlertDialog.Action =ResponsiveAlertDialogAction
ResponsiveAlertDialog.Close = ResponsiveAlertDialogClose;
