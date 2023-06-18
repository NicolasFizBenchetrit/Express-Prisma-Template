module.exports = {
  preset: 'ts-jest',
  moduleFileExtensions: ["ts", "js", "json"],
  testEnvironment: 'node',
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/test/**/*.spec.(ts|js)"]
};