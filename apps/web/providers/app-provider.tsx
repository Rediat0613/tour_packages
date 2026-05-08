"use client";

import {AuthProvider} from "./auth-provider";
import {QueryProvider} from "./query-provider";

type Props = {
  children: React.ReactNode;
};

export function AppProvider({children}: Props) {
  return (
    <QueryProvider>
      <AuthProvider>{children}</AuthProvider>
    </QueryProvider>
  );
}
