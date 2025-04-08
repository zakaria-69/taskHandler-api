module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'ts'],
  rootDir: './src',
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
};
