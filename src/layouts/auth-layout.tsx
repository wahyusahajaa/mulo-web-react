import { useAuthStore } from "@/lib/stores/authStore";
import { Navigate, Outlet } from "react-router";

export default function AuthLayout() {
  const session = useAuthStore((state) => state.session);

  if (session) {
    return <Navigate to={"/"} replace />;
  }

  return (
    <div className="min-h-screen w-full flex items-center">
      <Outlet />
    </div>
  );
}
