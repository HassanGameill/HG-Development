

'use client'

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactNode, useState } from "react"


interface TanstackChildrenProps {
  children: ReactNode;
}



export const TanstackProvider = ({children}: TanstackChildrenProps) => {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    )
}
