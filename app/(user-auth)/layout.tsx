import { GoogleOAuthProvider } from "@react-oauth/google";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_AUTH_CLIENT_ID || ""}
    >
      {children}
    </GoogleOAuthProvider>
  );
};

export default AuthLayout;
