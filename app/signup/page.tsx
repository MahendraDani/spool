import { SignupCard } from "@/components/auth/signup-card";
import { Navbar } from "@/components/navbar";

export default function SignUp() {
  return (
    <div>
      <Navbar />
      <div className="container-wrapper min-h-[80vh] md:min-h-[92vh] flex justify-center items-center">
        <SignupCard />
      </div>
    </div>
  );
}
