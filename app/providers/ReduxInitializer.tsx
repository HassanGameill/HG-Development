"use client";

import { useEffect, useRef } from "react";
import { store } from "@/redux/store";
import { apiSlice } from "@/redux/features/api/apiSlice";

export default function ReduxInitializer() {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    store.dispatch(
      apiSlice.endpoints.refreshToken.initiate({}, { forceRefetch: true })
    );

    store.dispatch(
      apiSlice.endpoints.loadUser.initiate({}, { forceRefetch: true })
    );
  }, []);

  return null;
}
