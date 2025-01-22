/// <reference types="vite/client" />

interface ImportMetaEnv {
    VITE_LOGIN: string;
    VITE_REGISTRY: string;
    VITE_LOGOUT: string;
    VITE_VERIFY: string;
    VITE_PORT: string;
    VITE_API_URL: string;
}

interface ImportMeta {
    env: ImportMetaEnv;
}

