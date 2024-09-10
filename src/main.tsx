import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import Loading from './components/Loading'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>
)
