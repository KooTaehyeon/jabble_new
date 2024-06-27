"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const ReactQueryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [client] = useState(new QueryClient()); // 클라이언트 측에서만 초기화되고 사용됨

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
};
