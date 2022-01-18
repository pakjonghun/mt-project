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
  plugins: [],
};
