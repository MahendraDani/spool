import { Navbar } from "@/components/navbar";
import { LoginCard } from "../../components/auth/login-card";

export default function LoginPage() {
  return (
    <div>
      <Navbar />
      <div className="container-wrapper min-h-[80vh] md:min-h-[92vh] flex justify-center items-center">
        <LoginCard />
      </div>
    </div>
  );
}
