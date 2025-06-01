import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const VerificationSuccess = () => {
  return (
    <Card className="w-full max-w-sm mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="text-4xl text-green-500">Yeay!</CardTitle>
        <CardDescription className="text-2xl text-muted-foreground font-light">
          Your has been activated.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button className="w-full">Continue</Button>
      </CardContent>
    </Card>
  );
};
