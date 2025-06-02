import { Button } from "@/components/ui/button";
import { IconBrandGithub } from "@tabler/icons-react";

export const GithubButton = () => {
  function redirectToGitHub() {
    const redirectUri = `https://github.com/login/oauth/authorize?client_id=${
      import.meta.env.VITE_GITHUB_CLIENT_ID
    }&scope=read:user%20user:email`;
    window.location.href = redirectUri;
  }

  return (
    <Button
      type="button"
      className="w-full"
      variant="secondary"
      onClick={redirectToGitHub}
    >
      <IconBrandGithub />
      Github
    </Button>
  );
};
