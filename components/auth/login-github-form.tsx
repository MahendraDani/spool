import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "../ui/button";
import { useForm } from "react-hook-form";
import { GithubIcon } from "../icons/github";

export const LoginWithGitHubForm = ()=> {
  const form = useForm();
  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="..."
          render={() => (
            <FormItem>
              <FormLabel />
              <FormControl>
                <Button
                  type="submit"
                  variant={"outline"}
                  className="flex justify-center items-center gap-2"
                >
                  <GithubIcon/>
                  <span>Continue with GitHub</span>
                </Button>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}
