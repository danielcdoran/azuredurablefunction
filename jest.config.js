/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  testMatch: ["./test/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  testPathIgnorePatterns: ["/node_modules/", "/dist/"],
  preset: 'ts-jest',
  testEnvironment: 'node',
};