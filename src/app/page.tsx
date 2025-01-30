"use client";

import { useAuth } from "react-oidc-context";
import Image from "next/image";

export default function Home() {
  const auth = useAuth();

  const signOutRedirect = () => {
    const clientId = "3qb7u5qrkk5hq11do53pt7a63q";
    const logoutUri = "<logout uri>";
    const cognitoDomain =
      "https://eu-central-1bql95qceb.auth.eu-central-1.amazoncognito.com";
    window.location.href = `${cognitoDomain}/logout?client_id=${clientId}&logout_uri=${encodeURIComponent(logoutUri)}`;
  };

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
        <pre>Name: {auth.user?.profile.name}</pre>
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
    <div>
      <button onClick={() => auth.signinRedirect()}>Sign in</button>
      <button onClick={() => signOutRedirect()}>Sign out</button>
    </div>
  );
}
