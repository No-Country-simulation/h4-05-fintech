/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_LOGIN: string;
    VITE_REGISTRY: string;
    VITE_LOGOUT: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}

