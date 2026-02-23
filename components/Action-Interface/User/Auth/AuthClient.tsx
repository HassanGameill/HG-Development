"use client";

import React, { useState } from "react";
import Auth from "./Auth";
import { TAuthRoute } from "@/types/authTypes";

const AuthClient = () => {
  const [authOpen, setAuthOpen] = useState(false);
  const [authRoute, setAuthRoute] = useState<TAuthRoute>("login"); // default route
  return (
    <div>
      <Auth
        route={authRoute}
        setRoute={(route: TAuthRoute) => {
          setAuthRoute(route);
          setAuthOpen(true); // open modal whenever route changes
        }}
      />
    </div>
  );
};

export default AuthClient;
