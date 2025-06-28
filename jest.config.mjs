export default {
  testEnvironment: 'node',
  testMatch: ['<rootDir>/__tests__/**/*.test.js'],
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.js'],
  coverageDirectory: 'coverage',
  coverageReporters: ['lcov', 'text'],
}
