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
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

type TResponsiveModalContext = {
  showResponsiveModal: boolean;
  setShowResponsiveModal: (open: boolean) => void;
};

const ResponsiveModalContext = createContext<
  TResponsiveModalContext | undefined
>(undefined);

export const useResponsiveModalContext = () => {
  const context = useContext(ResponsiveModalContext);

  if (context === undefined) {
    throw new Error(
      "useResponsiveModalContext must be used within ResponsiveModal.Provider"
    );
  }
  return context;
};

export const ResponsiveModal = ({ children }: { children: ReactNode }) => {
  const [showResponsiveModal, setShowResponsiveModal] = useState(false);
  const { isMobile } = useMediaQuery();

  const contextValue = useMemo(
    () => ({ showResponsiveModal, setShowResponsiveModal }),
    [showResponsiveModal]
  );

  if (isMobile) {
    return (
      <ResponsiveModalContext.Provider value={contextValue}>
        <Drawer
          open={showResponsiveModal}
          onOpenChange={setShowResponsiveModal}
        >
          {children}
        </Drawer>
      </ResponsiveModalContext.Provider>
    );
  }

  return (
    <ResponsiveModalContext.Provider value={contextValue}>
      <Dialog open={showResponsiveModal} onOpenChange={setShowResponsiveModal}>
        {children}
      </Dialog>
    </ResponsiveModalContext.Provider>
  );
};

const ResponsiveModalTrigger = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return (
      <DrawerTrigger asChild className={className}>
        {children}
      </DrawerTrigger>
    );
  }

  return (
    <DialogTrigger asChild className={cn(className)}>
      {children}
    </DialogTrigger>
  );
};

const ResponsiveModalContent = ({
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

  return <DialogContent className={cn(className)}>{children}</DialogContent>;
};

const ResponsiveModalHeader = ({
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
    <DialogHeader className={cn(className)} {...props}>
      {children}
    </DialogHeader>
  );
};

// TODO : How to pass down the props of both DrawerTitle and DialogTitle?
const ResponsiveModalTitle = ({
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

  return <DialogTitle className={cn(className)}>{children}</DialogTitle>;
};

const ResponsiveModalDescription = ({
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
    <DialogDescription className={cn(className)}>{children}</DialogDescription>
  );
};

const ResponsiveModalFooter = ({
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

  return <DialogFooter className={cn(className)}>{children}</DialogFooter>;
};

const ResponsiveModalClose = ({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) => {
  const { isMobile } = useMediaQuery();
  if (isMobile) {
    return (
      <DrawerClose asChild className={className}>
        {children}
      </DrawerClose>
    );
  }

  return (
    <DialogClose asChild className={cn(className)}>
      {children}
    </DialogClose>
  );
};

ResponsiveModal.Trigger = ResponsiveModalTrigger;
ResponsiveModal.Content = ResponsiveModalContent;
ResponsiveModal.Header = ResponsiveModalHeader;
ResponsiveModal.Title = ResponsiveModalTitle;
ResponsiveModal.Description = ResponsiveModalDescription;
ResponsiveModal.Footer = ResponsiveModalFooter;
ResponsiveModal.Close = ResponsiveModalClose;
