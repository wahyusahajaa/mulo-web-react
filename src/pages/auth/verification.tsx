import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { z } from "zod";

const loginSchema = z.object({
  code: z.string().min(1, {
    message: "Verification code must be not empty.",
  }),
});

export const Verification = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      code: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    console.log({ values });
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Verification</CardTitle>
        <CardDescription>Activate your account.</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Code</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter your code"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription>
                    Check your email for verification code
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="space-y-4">
              <Button
                type="submit"
                className="w-full"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin" />
                    Continue ...
                  </>
                ) : (
                  "Continue"
                )}
              </Button>
              <div className="flex gap-x-1 text-sm justify-center">
                <p>Don't receive an email?</p>
                <NavLink to="/register" className="text-primary font-medium">
                  Resend
                </NavLink>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
