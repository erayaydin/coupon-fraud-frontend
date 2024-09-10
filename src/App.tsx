import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import React, { Suspense, useEffect, useState } from 'react'
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material'
import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import Checkout from './components/Checkout'
import { FpjsProvider } from '@fingerprintjs/fingerprintjs-pro-react'

const queryClient = new QueryClient()

const ReactQueryDevtoolsProduction = React.lazy(() =>
  import('@tanstack/react-query-devtools/build/modern/production.js').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
)

const materialTheme = createTheme({
  colorSchemes: {
    dark: true,
  },
})

export default function App() {
  const [showDevtools, setShowDevtools] = useState(false)

  const fpJSOptions = {
    apiKey: import.meta.env.VITE_FINGERPRINT_API_KEY,
    region: import.meta.env.VITE_FINGERPRINT_REGION || 'eu',
  }

  useEffect(() => {
    // @ts-expect-error only some browsers support toggleDevtools signal
    window.toggleDevtools = () => setShowDevtools((old) => !old)
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <FpjsProvider loadOptions={fpJSOptions}>
        <ThemeProvider theme={materialTheme}>
          <CssBaseline enableColorScheme />
          <Checkout />
        </ThemeProvider>
        <ReactQueryDevtools initialIsOpen={false} />
        {showDevtools && (
          <Suspense fallback={null}>
            <ReactQueryDevtoolsProduction />
          </Suspense>
        )}
      </FpjsProvider>
    </QueryClientProvider>
  )
}
