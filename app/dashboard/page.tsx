import { UserCard } from "@/components/user-card";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
// import { redirect } from "next/navigation";

export default async function Dashboard() {
  const session = await auth.api.getSession({
    headers : await headers()
  });

  // if(!session){
  //   redirect("/")
  // }

  return <div className="container">
    <h1>Dashboard</h1>
    <pre>{JSON.stringify(session,null,2)}</pre>
    <UserCard/>
  </div>
}