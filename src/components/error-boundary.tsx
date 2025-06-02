import { isRouteErrorResponse, NavLink, useRouteError } from "react-router";
import { Button } from "./ui/button";
import { ThemeProvider } from "./theme-provider";

export function ErrorBoundary() {
  const error = useRouteError();
  console.error("Route error:", error);

  if (isRouteErrorResponse(error)) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-full min-h-screen items-center justify-center p-4 flex flex-col gap-2">
          <h1 className="text-4xl font-medium">
            {error.status} {error.statusText}
          </h1>
          <p>
            {typeof error.data === "string"
              ? error.data
              : "An unexpected error occurred."}
          </p>
          <Button asChild>
            <NavLink to="/">Go back home</NavLink>
          </Button>
        </div>
      </ThemeProvider>
    );
  }

  if (error instanceof Error) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <div className="w-full min-h-screen items-center justify-center p-4 flex flex-col gap-2">
          <h1 className="text-4xl font-medium">Unexpected Error</h1>
          <p>{error.message}</p>
          <pre>{error.stack}</pre>
          <Button asChild>
            <NavLink to="/">Go back home</NavLink>
          </Button>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <div className="w-full min-h-screen items-center justify-center p-4 flex flex-col gap-2">
        <h1 className="text-4xl font-medium">Something went wrong</h1>
        <Button asChild>
          <NavLink to="/">Go back home</NavLink>
        </Button>
      </div>
    </ThemeProvider>
  );
}
