import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
// import { LoginWithEmailForm } from "./login-email-form";
import { LoginWithGitHubForm } from "./login-github-form";
import { LoginWithUsernameForm } from "./login-username-form";

export const LoginCard = () => {
  return (
    <Card className="w-md rounded-none border-grid">
      <CardHeader className="border-b border-dashed place-content-center">
        <CardTitle className="text-center md:text-xl">
          Log into your account
        </CardTitle>
        <CardDescription>
          {"Create, save, and share code — no setup, no distractions."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <LoginWithUsernameForm />
        <div className="mt-3 mb-1 flex flex-shrink items-center justify-center gap-2">
          <div className="grow basis-0 border-b border-border border-dashed" />
          <span className="text-xs font-normal uppercase leading-none text-neutral-500">
            or
          </span>
          <div className="grow basis-0 border-b border-border border-dashed" />
        </div>
        <LoginWithGitHubForm />
      </CardContent>
      <CardFooter className="justify-center text-sm text-muted-foreground space-x-1">
        <span>{`Don't have an account?`}</span>
        <span>
          <Link href={"/signup"} className="underline">
            Sign up
          </Link>
        </span>
      </CardFooter>
    </Card>
  );
};



