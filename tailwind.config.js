/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // Soporte para modo oscuro
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
    },
    extend: {
      screens: {
        '2xsm': '375px',
        'xsm': '425px',
        '3xl': '2000px',
      },

      colors: {
        brand: {
          25: "#f2f7ff",
          50: "#ecf3ff",
          100: "#dde9ff",
          200: "#c2d6ff",
          300: "#9cb9ff",
          400: "#7592ff",
          500: "#465fff",
          600: "#3641f5",
          700: "#2a31d8",
          800: "#252dae",
          900: "#262e89",
          950: "#161950", 
        },

        gray: {
          25: "#fcfcfd",
          50: "#f9fafb",
          100: "#f2f4f7",
          200: "#e4e7ec",
          300: "#d0d5dd",
          400: "#98a2b3",
          500: "#667085",
          600: "#475467",
          700: "#344054",
          800: "#1d2939",
          900: "#101828",
          950: "#0c111d",
          dark: "#1a2231",
        },

        system: {
          bg: "#F3F4F6",
          card: "#FFFFFF",
          tableHeader: "#E5E7EB",
          rowAlt: "#F9FAFB",
          rowHover: "#DBEAFE",
        },

        primary: "#2563EB",
        primaryHover: "#1D4ED8",

        info: "#0EA5E9",
        infoHover: "#0284C7",

        danger: "#DC2626",
        dangerHover: "#B91C1C",

        print: "#9333EA",
        printHover: "#7E22CE",
      },

      boxShadow: {
        "theme-xs": "0px 1px 2px 0px rgba(16,24,40,0.05)",
        "theme-sm": "0px 1px 3px 0px rgba(16,24,40,0.1), 0px 1px 2px 0px rgba(16,24,40,0.06)",
        "theme-md": "0px 4px 8px -2px rgba(16,24,40,0.1), 0px 2px 4px -2px rgba(16,24,40,0.06)",
        "theme-lg": "0px 12px 16px -4px rgba(16,24,40,0.08), 0px 4px 6px -2px rgba(16,24,40,0.03)",
        "theme-xl": "0px 20px 24px -4px rgba(16,24,40,0.08), 0px 8px 8px -4px rgba(16,24,40,0.03)",
      },

      zIndex: {
        1: "1",
        9: "9",
        99: "99",
        999: "999",
        9999: "9999",
        99999: "99999",
        999999: "999999",
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".menu-item": {
          "@apply relative flex items-center w-full gap-3 px-3 py-2 font-medium rounded-lg text-sm":
            {},
        },
        ".menu-item-active": {
          // Fondo activo con brand-950, texto blanco
          "@apply bg-brand-950 text-white dark:bg-brand-950 dark:text-white": {},
        },
        ".menu-item-inactive": {
          "@apply text-gray-700 hover:bg-system-rowHover dark:text-gray-300 dark:hover:bg-gray-800":
            {},
        },
      });
    },
  ],
};