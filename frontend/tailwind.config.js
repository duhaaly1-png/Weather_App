export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"]
      },
      colors: {
        ink: "#17202a",
        mist: "#f5f7fb",
        ocean: "#0f6b8f",
        coral: "#d85b4f",
        pine: "#276749",
        sun: "#f2b84b"
      },
      boxShadow: {
        soft: "0 20px 60px rgba(23, 32, 42, 0.12)"
      }
    }
  },
  plugins: []
};
