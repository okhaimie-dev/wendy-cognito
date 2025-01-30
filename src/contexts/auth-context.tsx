"use client";

import { AuthProvider } from "react-oidc-context";
import { ReactNode } from "react";

const cognitoAuthConfig = {
  authority:
    "https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_BqL95qCEb",
  client_id: "3qb7u5qrkk5hq11do53pt7a63q",
  redirect_uri: "https://wendy-cognito.vercel.app/",
  response_type: "code",
  scope: "openid",
};

interface AuthContextProps {
  children: ReactNode;
}

const AuthContext = ({ children }: AuthContextProps) => {
  return <AuthProvider {...cognitoAuthConfig}>{children}</AuthProvider>;
};

export default AuthContext;
