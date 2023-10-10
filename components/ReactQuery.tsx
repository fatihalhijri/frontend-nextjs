"use client";

import { QueryClient,QueryClientProvider,useQuery,} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode } from "react";

interface ReactQueryProps {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQuery: React.FC<ReactQueryProps> = ({ children }) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}
    <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};
export default ReactQuery;
