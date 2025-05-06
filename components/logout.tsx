"use client";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";

export const LogoutButton = ()=>{
  const router = useRouter();
  const handleForm = async (event: FormEvent<HTMLFormElement>)=>{
    event.preventDefault();
    const {data,error} = await authClient.signOut();
    if(error){
      alert(error.message);
      return;
    }
    console.log(data);
    router.push("/"); // redirect to home page
  }
  return (
    <form onSubmit={handleForm}>
      <Button size={"sm"}>Logout</Button>
    </form>
  )
}