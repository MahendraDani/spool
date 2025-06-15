import { SessionContext } from "@/context/session-context"
import { useContext } from "react"

export const useSession = ()=>{
  const context = useContext(SessionContext);
  if(context===undefined){
    throw new Error("useSession must be used within a SessionProvider")
  }

  return {
    session : context.session,
    loginUser : context.loginUser
  }
}