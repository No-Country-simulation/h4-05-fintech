import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: "#E5E7EB",        // Para elementos grises claros
        copper: "#F97316",       // Para el botón marrón/cobrizo de registro
        teal: "#239BC3",         // Para el azul verdoso del logo/fondo
        shadow: "#0F1417",       // Para sombras y textos oscuros
      },
    },
  },
  plugins: [],
} satisfies Config;