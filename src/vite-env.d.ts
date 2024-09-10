/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_ENVIRONMENT: string
  readonly VITE_API_URL: string
  readonly VITE_FINGERPRINT_API_KEY: string
  readonly VITE_FINGERPRINT_REGION: 'eu' | 'us' | 'ap'
  readonly VITE_FINGERPRINT_ENDPOINT: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
