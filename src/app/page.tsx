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
      <div className="overflow-hidden bg-white shadow sm:rounded-lg">
        <Card className="flex min-h-svh bg-red flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
          <CardHeader className="text-base/7 font-semibold text-gray-900">
            <CardTitle className="text-2xl text-center">
              Federate User Information
            </CardTitle>
            <CardDescription className="text-center mt-1 max-w-2xl text-sm/6 text-gray-500">
              Details
            </CardDescription>
          </CardHeader>
          <CardContent className="border-t border-gray-100">
            <dl className="divide-y divide-gray-100">
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Email</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.profile.email}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  Family name
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.profile.family_name}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  Given name
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.profile.given_name}
                </dd>
              </div>
              <Image
                src="/cat-img.jpg"
                width={500}
                height={500}
                alt="Picture of the author"
              />
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">ID Token</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.id_token}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  Access Token
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.access_token}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">
                  Refresh Token
                </dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.refresh_token}
                </dd>
              </div>
              <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt className="text-sm font-medium text-gray-900">Scope</dt>
                <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                  {auth.user?.scope}
                </dd>
              </div>
              <Button type="submit" onClick={() => auth.removeUser()}>
                Sign out
              </Button>
            </dl>
          </CardContent>
        </Card>
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
