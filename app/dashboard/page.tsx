import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { LogOutButton } from "./logout";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers : await headers()
  });

  return <div>
    <h1>Dashboard</h1>
    <pre>{JSON.stringify(session,null,2)}</pre>
    <LogOutButton/>
  </div>
}