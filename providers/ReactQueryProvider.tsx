import React from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Explicitly annotate the component as React.FC
const ReactQueryClientProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const queryClient = new QueryClient()

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
}

export default ReactQueryClientProvider
