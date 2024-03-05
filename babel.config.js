module.exports = {
  plugins: ["babel-plugin-transform-vite-meta-env"],

  presets: [
    ["@babel/preset-env", { targets: { esmodules: true } }],
    ["@babel/preset-react", { runtime: "automatic" }],
    ["@babel/preset-typescript"],
    ["babel-preset-vite"],
  ],
};
