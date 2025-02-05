import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import path from "path";
var port = process.env.VITE_PORT;
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: { port: parseInt(port) || 3000 },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
});
