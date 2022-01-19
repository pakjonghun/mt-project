const plugin = require("tailwindcss/plugin");
module.exports = {
  content: ["./src/**/*.tsx"],
  theme: {
    extend: {
      height: {
        "60vh": "60vh",
        "80vh": "80vh",
        "90vh": "90vh",
        "100vh": "100vh",
      },
      backgroundImage: {
        basic: `url('/src/images/empty.jpg')`,
      },
      blur: {
        px: `1px`,
      },
    },
  },

  plugins: [
    plugin(function ({ addBase, theme, addVariant, addComponents }) {
      addComponents({
        ".card": {
          "background-color": "#fff",
          "border-radius": ".25rem",
          "box-shadow": "0 2px 4px rgba(0,0,0,0.2)",
        },
        ".pb-15%": {
          "padding-bottom": "15%",
        },
        ".pb-12%": {
          "padding-bottom": "12%",
        },
        ".pb-10%": {
          "padding-bottom": "10%",
        },
        ".pb-8%": {
          "padding-bottom": "8%",
        },
        ".pb-7%": {
          "padding-bottom": "7%",
        },
        ".pb-70%": {
          "padding-bottom": "70%",
        },
      });
      addVariant("hocus", ["&:hover", "&:focus"]);
      addBase({
        h1: { fontSize: theme("fontSize.2xl") },
      });
    }),
  ],
};
