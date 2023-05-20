/// <reference types="vite/client" />
/// <reference types="vue/macros-global" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
