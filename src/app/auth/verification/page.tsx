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
import api from "@/lib/axiosInstance";
import type { ErrorResponse } from "@/types/error.type";
import { handleAxiosError } from "@/utils/handleAxiosError";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";
import { z } from "zod";

const loginSchema = z.object({
  code: z.string().length(5).min(1, "Verification code must be not empty."),
});

export const Verification = () => {
  const [params] = useSearchParams();
  const email = decodeURIComponent(params.get("email") || "");
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [countDownResend, setCountDownResend] = useState<number>(0);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isResend, setIsResend] = useState<boolean>(false);

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      code: "",
    },
  });

  useEffect(() => {
    async function verificationStatus() {
      setLoading(true);
      await api
        .get("/auth/verification-status", {
          params: {
            email: email,
          },
        })
        .then((res) => {
          const resBody = res.data;
          const { verified } = resBody.data;
          // User already verified navigate to /login
          if (verified) return navigate("/login");
        })
        .catch((error) => {
          const handleError = handleAxiosError<ErrorResponse>(error);
          toast.error("ups", {
            description: handleError.message,
          });
          navigate("/login");
        })
        .finally(() => setLoading(false));
    }

    verificationStatus();
  }, [email, navigate]);

  useEffect(() => {
    if (countDownResend === 0) {
      setCanResend(true);
      return;
    }

    const timer = setInterval(() => {
      setCountDownResend((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [countDownResend]);

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    await api
      .post("/auth/verify", {
        code: values.code,
        email: email,
      })
      .then((res) => {
        const resBody = res.data;
        toast.success("Success", {
          description: resBody.message,
        });
        navigate("/login");
      })
      .catch((error) => {
        const handleError = handleAxiosError<ErrorResponse>(error);
        toast.error("Ups", {
          description: handleError.message,
        });
      });
  }

  async function handleResendCode() {
    setIsResend(true);
    await api
      .post("/auth/resend-verification", {
        email: email,
      })
      .then((res) => {
        const resBody = res.data;
        setCanResend(false);
        setCountDownResend(30);
        toast.success("Success", {
          description: resBody.message,
        });
      })
      .catch((error) => {
        const handleError = handleAxiosError<ErrorResponse>(error);
        toast.error("Ups", {
          description: handleError.message,
        });
        if (handleError.code === 404 || handleError.code === 409)
          return navigate("/login");
      })
      .finally(() => setIsResend(false));
  }

  return (
    <div className="w-full min-h-screen relative flex items-center justify-center">
      {loading && (
        <div className="absolute inset-0 bg-background/20 backdrop-blur-xs flex items-center justify-center">
          <div className="flex gap-1 items-center select-none">
            <Loader2 className="animate-spin" />
            <span>Please wait...</span>
          </div>
        </div>
      )}
      <Card className="w-full max-w-sm mx-auto">
        <CardHeader>
          <CardTitle>Account Verification</CardTitle>
          <CardDescription>
            Please verify your email to activate your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Verification Code</FormLabel>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Enter your verification code"
                        pattern="[0-9]*"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      {"We've sent a verification code to your email."}
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
                      Confirm ...
                    </>
                  ) : (
                    "Confirm"
                  )}
                </Button>
                <div className="flex text-sm justify-center items-center">
                  <p>Don't receive an email?</p>
                  {canResend ? (
                    <Button
                      type="button"
                      variant={"link"}
                      size={"sm"}
                      className="text-primary font-medium px-1 h-auto"
                      disabled={isResend}
                      onClick={handleResendCode}
                    >
                      Resend
                    </Button>
                  ) : (
                    <p className="px-1 font-medium">
                      Resend in {countDownResend}s
                    </p>
                  )}
                </div>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
};
