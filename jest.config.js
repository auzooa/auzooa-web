module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: 'coverage',
  coverageReporters: ['text-summary', 'lcov'],
  setupFiles: ['<rootDir>/tests/set-up.ts'],
  restoreMocks: true,
  clearMocks: true,
  resetMocks: true
}
