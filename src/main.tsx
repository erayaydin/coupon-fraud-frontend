import { createRoot } from 'react-dom/client'
import { StrictMode, Suspense } from 'react'
import Loading from './components/Loading'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <p>Hello, World!</p>
    </Suspense>
  </StrictMode>
)
