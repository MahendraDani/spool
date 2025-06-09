"use client";

import { Session, User } from "better-auth";
import { createContext } from "react";

export type TSessionContext = {
  session : Session,
  loginUser : User
}

export const SessionContext = createContext<TSessionContext | undefined>(undefined);