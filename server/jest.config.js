module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    transform: {
        '^.+\\.ts?$': 'ts-jest',
        "\\.[jt]sx?$": "babel-jest",
    },
    transformIgnorePatterns: ['<rootDir>/server/node_modules/'],
};
