"use client";

import { store } from "@/hooks/redux-toolkit/store";
import { Provider } from "react-redux";
import { ReactNode } from "react";

interface ProvidersProps {
  children: ReactNode;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      {children}
    </Provider>
  );
}
