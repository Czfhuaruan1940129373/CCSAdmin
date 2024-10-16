/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_API_BASE_PATH: string
  readonly VITE_BASE_PATH: string
  readonly VITE_DROP_DEBUGGER: string
  readonly VITE_DROP_CONSOLE: string
  readonly VITE_SOURCEMAP: string
  readonly VITE_OUT_DIR: string
  readonly DB_CON_USER: string
  readonly DB_CON_PASS: string
  readonly DB_CON_DATABASE: string
  readonly DB_CON_SERVER: string
  readonly DB_CON_PROT: number
}

declare global {
  interface ImportMeta {
    readonly env: ImportMetaEnv
  }
}
