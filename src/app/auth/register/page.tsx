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
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/lib/axiosInstance";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { GithubButton } from "../../../components/github-button";
import type { ErrorResponse } from "@/types/error.type";

const registerSchema = z
  .object({
    full_name: z.string().min(1, "Fullname must be not empty."),
    username: z
      .string()
      .min(1, "Username must be not empty.")
      .regex(/^[a-zA-Z0-9]+$/, "Only letters and numbers are allowed"),
    email: z.string().min(1, "Email must be not empty."),
    password: z
      .string()
      .min(1, "Password must be not empty.")
      .min(6, "Minimum password is 6 characters."),
    confirm_password: z.string().min(1, "Confirm Password must be not empty."),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Passwords do not match",
    path: ["confirm_password"],
  });

export const Register = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      full_name: "",
      username: "",
      email: "",
      password: "",
      confirm_password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    await api
      .post("/auth/register", {
        full_name: values.full_name,
        username: values.username,
        email: values.email,
        password: values.password,
      })
      .then(() => {
        navigate(`/verification?email=${encodeURIComponent(values.email)}`);
      })
      .catch((error) => {
        const handleError = handleAxiosError<ErrorResponse>(error);
        toast.error("Ups", {
          description: handleError.message,
        });
      });
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Please enter your registration details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="full_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Enter your name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Create a username"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Please enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Create your password"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirm_password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      type="password"
                      placeholder="Type your password again."
                      {...field}
                    />
                  </FormControl>
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
                    Submitting ...
                  </>
                ) : (
                  "Submit"
                )}
              </Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or register with
                  </span>
                </div>
              </div>
              <GithubButton />
              <div className="flex gap-x-1 text-sm justify-center">
                <p>Already have an account?</p>
                <NavLink to="/login" className="text-primary font-medium">
                  Login
                </NavLink>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
