SECONDS = 1000;
module.exports = {
  testEnvironment: "node",
  verbose: true,
  coveragePathIgnorePatterns: ["/node_modules/"],
  testTimeout: SECONDS * 60 * 10,
};
