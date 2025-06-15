"use client";
import { SessionContext, TSessionContext } from "@/context/session-context";
import { ReactNode } from "react";

export const SessionProvider = ({
  children,
  data,
}: {
  children: ReactNode;
  data: TSessionContext;
}) => {
  return (
    <SessionContext.Provider
      value={{ session: data.session, loginUser: data.loginUser }}
    >
      {children}
    </SessionContext.Provider>
  );
};
