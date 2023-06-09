import type { AppProps } from 'next/app'
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { useState } from 'react'
import MetaHead from '@/components/MetaHead'
import GlobalStyle from '@/styles/globalStyle'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'


export default function App({ Component, pageProps }: AppProps) {
  const [queryClient] = useState(() => new QueryClient())
  return (
    <>
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
      <ReactQueryDevtools initialIsOpen={false} />
        <Component {...pageProps} />
      </Hydrate>
    </QueryClientProvider>
    <GlobalStyle />
    </>
  )
}
