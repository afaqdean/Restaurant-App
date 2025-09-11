import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      screens: {
        "2xl": "1536px",
        "3xl": "1920px",
        "4xl": "2560px",
        "5xl": "3200px",
        "6xl": "3840px",
      },
      maxWidth: {
        "8xl": "88rem", // 1408px
        "9xl": "96rem", // 1536px
        "10xl": "104rem", // 1664px
        "11xl": "112rem", // 1792px
        "12xl": "120rem", // 1920px
        "13xl": "128rem", // 2048px
        "14xl": "136rem", // 2176px
        "15xl": "144rem", // 2304px
        "16xl": "152rem", // 2432px
        "17xl": "160rem", // 2560px
        "18xl": "168rem", // 2688px
        "19xl": "176rem", // 2816px
        "20xl": "184rem", // 2944px
        "21xl": "192rem", // 3072px
        "22xl": "200rem", // 3200px
        "23xl": "208rem", // 3328px
        "24xl": "216rem", // 3456px
        "25xl": "224rem", // 3584px
        "26xl": "232rem", // 3712px
        "27xl": "240rem", // 3840px
      },
      colors: {
        primary: {
          50: "#fef2f2",
          500: "#ef4444",
          600: "#dc2626",
          700: "#b91c1c",
        },
      },
    },
  },
  plugins: [],
};
export default config;
