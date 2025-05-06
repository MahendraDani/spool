import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { LogoutButton } from "@/components/logout";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers : await headers()
  });

  return <div>
    <h1>Dashboard</h1>
    <pre>{JSON.stringify(session,null,2)}</pre>
    <LogoutButton/>
  </div>
}