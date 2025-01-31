import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center">Cognito PoC</CardTitle>
          <CardDescription className="text-center">
            Pilot project for AWS Cognito
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="flex flex-col gap-6">
              <Button type="submit" className="w-full">
                Login with AWS Federate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
