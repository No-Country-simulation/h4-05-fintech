/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        slate: "#E5E7EB",
        copper: "#F97316",
        teal: "#239BC3",
        shadow: "#0F1417",
        lightBlue: "#8BD0EF",
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      fontFamily: {
        roboto: ['"Roboto"', "sans-serif"],
        poppins: ['"Poppins"', "sans-serif"],
        inter: ['"Inter"', "sans-serif"],
        openSans: ['"Open Sans"', "sans-serif"],
      },
    }
  },
  plugins: [require("tailwindcss-animate")],
}
