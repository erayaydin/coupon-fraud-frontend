/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENVIRONMENT: string
  readonly VITE_API_URL: string
  readonly VITE_FINGERPRINT_API_KEY: string
  readonly VITE_FINGERPRINT_REGION: 'eu' | 'us' | 'ap'
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
