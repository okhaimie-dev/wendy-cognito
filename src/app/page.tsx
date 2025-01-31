"use client";

import { useAuth } from "react-oidc-context";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function LoginForm({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const auth = useAuth();
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
              <Button
                type="submit"
                className="w-full"
                onClick={() => auth.signinRedirect()}
              >
                Login with AWS Federate
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  const auth = useAuth();

  // const signOutRedirect = () => {
  //   const clientId = "3qb7u5qrkk5hq11do53pt7a63q";
  //   const logoutUri = "<logout uri>";
  //   const cognitoDomain =
  //     "https://eu-central-1bql95qceb.auth.eu-central-1.amazoncognito.com";
  //   window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  // };

  if (auth.isLoading) {
    return <div>Loading...</div>;
  }

  if (auth.error) {
    return <div>Encountering error... {auth.error.message}</div>;
  }

  if (auth.isAuthenticated) {
    return (
      <div>
        <pre> Hello: {auth.user?.profile.email} </pre>
        <pre>Family name: {auth.user?.profile.family_name}</pre>
        <pre>Given name: {auth.user?.profile.given_name}</pre>
        <Image
          src="/cat-img.jpg"
          width={500}
          height={500}
          alt="Picture of the author"
        />
        <pre> ID Token: {auth.user?.id_token} </pre>
        <pre> Access Token: {auth.user?.access_token} </pre>
        <pre> Refresh Token: {auth.user?.refresh_token} </pre>
        <pre> {auth.user?.scope}</pre>
        <button onClick={() => auth.removeUser()}>Sign out</button>
      </div>
    );
  }

  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  );
}
