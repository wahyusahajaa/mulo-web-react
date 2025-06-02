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
import type { ErrorResponse } from "@/types/error.type";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { NavLink, useLocation, useNavigate } from "react-router";
import { toast } from "sonner";
import { z } from "zod";
import { GithubButton } from "./github-button";
import { useAuthStore } from "@/lib/stores/authStore";

const loginSchema = z.object({
  email: z.string().min(1, "Email must be not empty."),
  password: z.string().min(1, "Password must be not empty."),
});

export const Login = () => {
  const { login } = useAuthStore((state) => state);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    try {
      await api.post("/auth/login", {
        email: values.email,
        password: values.password,
      });
      const userRes = await api.get("/auth/me");
      const { data: user } = userRes.data;

      login({
        user: {
          id: user.id,
          full_name: user.full_name,
          email: user.email,
          role: user.role,
          avatar: user.image.src,
        },
      });

      toast.success("Success", {
        description: `Welcome back ${user.full_name}`,
      });

      navigate(from, { replace: true });
    } catch (error) {
      const handleError = handleAxiosError<ErrorResponse>(error);
      if (handleError.code === 403) {
        navigate(`/verification?email=${encodeURIComponent(values.email)}`);
      } else {
        toast.error("Ups", {
          description: handleError.message,
        });
      }
    }
  }

  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
        <CardDescription>
          Please enter your credentials to continue.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
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
                      placeholder="Enter your password"
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
                    Logged In ...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
              <div className="relative w-full">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t"></span>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">
                    Or continue with
                  </span>
                </div>
              </div>
              <GithubButton />
              <div className="flex gap-x-1 text-sm justify-center">
                <p>Don't have an account?</p>
                <NavLink to="/register" className="text-primary font-medium">
                  Register
                </NavLink>
              </div>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
