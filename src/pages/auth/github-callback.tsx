import api from "@/lib/axiosInstance";
import { useAuthStore } from "@/lib/stores/authStore";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { toast } from "sonner";

export const GithubCallback = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [params] = useSearchParams();
  const code = params.get("code");
  const navigate = useNavigate();
  const { login } = useAuthStore((state) => state);

  useEffect(() => {
    if (!code) {
      navigate("/login");
      return;
    }

    const controller = new AbortController();

    async function githubCallback() {
      setLoading(true);
      try {
        await api.post("/auth/oauth/github/callback", {
          code: code,
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
        navigate("/");
        return;
      } catch (err) {
        console.error("GitHub login error:", err);
        toast.success("Ups", {
          description: `Something went wrong. Please try again.`,
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    }

    githubCallback();

    return () => {
      controller.abort();
    };
  }, [code, navigate, login]);

  if (!loading) return null;

  return (
    <div className="flex items-center justify-center min-h-screen w-full">
      <div className="flex gap-1.5 items-center">
        <Loader2 className="animate-spin" />
        <span>Please wait...</span>
      </div>
    </div>
  );
};
