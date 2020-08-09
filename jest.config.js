module.exports = {
  roots: ["<rootDir>/src"],
  transform: {
    "\\.ts$": ["ts-jest"]
  },
  testRegex: "(app.*|(\\.|/)(test|spec))\\.ts$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  collectCoverage: true,
  setupFilesAfterEnv: ["./src/tests/setup.ts"],
};