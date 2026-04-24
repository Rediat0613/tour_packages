"use client";

import {QueryProvider} from "./query-provider";

type Props = {
  children: React.ReactNode;
};

export function AppProvider({children}: Props) {
  return <QueryProvider>{children}</QueryProvider>;
}
