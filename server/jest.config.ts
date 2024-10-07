module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  moduleFileExtensions: ["ts", "js"],
  testMatch: ["<rootDir>/__tests__/**/*.test.(ts|js)"],
  setupFilesAfterEnv: ["<rootDir>/__tests__/bootstrap.ts"],
  detectOpenHandles: true,
  forceExit: true,
};
