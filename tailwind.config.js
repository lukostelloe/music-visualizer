/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {},
    colors: {
      "gpt-message-box-gray": "#40414F",
      "gpt-sidebar-dark-gray": "#202123",
      "gpt-AI-message-area-gray": "#444655",
      "gpt-USER-message-area-gray": "#343640",
      "gpt-info-text-gray": "#c5c5d2",
    },
    fontFamily: {
      sans: ["Helvetica", "Clear Sans", "sans-serif"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
    },
  },
  plugins: [],
};
