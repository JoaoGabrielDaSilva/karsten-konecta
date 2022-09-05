module.exports = {
  testEnvironment: "node",
  transform: {
    "^.+\\.[j|t].{s, sx}?$": "jest-expo",
  },
  preset: "jest-expo",
  // transformIgnorePatterns: ["node_modules/(?!@react-native|react-native)"],
  setupFilesAfterEnv: [
    "@testing-library/jest-native/extend-expect",
    "./jest/setup-file.js",
  ],
};
