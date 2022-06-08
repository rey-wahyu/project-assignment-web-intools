// const { pathsToModuleNameMapper } = require("ts-jest/utils");
const { pathsToModuleNameMapper } = require("ts-jest");
const { compilerOptions } = require("../tsconfig.json");

const paths = compilerOptions.paths ? compilerOptions.paths : {};

module.exports = {
    rootDir: "../",
    collectCoverage: true,
    moduleDirectories: ["node_modules", "src"],
    // moduleFileExtensions: ["js", "jsx"],
    coveragePathIgnorePatterns: [
        "<rootDir>/test/",
        "<rootDir>/src/components/AdditionalComponent",
        "<rootDir>/src/components/ExportToExcel",
        "<rootDir>/src/components/InstantTemplate",
        "<rootDir>/src/components/Loading",
        "<rootDir>/src/components/ModalConfirm",
        "<rootDir>/src/components/PageTitle",
        "<rootDir>/src/components/TemplateComponent"
    ],
    passWithNoTests: true,
    testEnvironment: "jsdom",
    testMatch: ["<rootDir>/pages/**/*.test.[jt]s?(x)", "<rootDir>/src/**/*.test.[jt]s?(x)"],
    setupFilesAfterEnv: ["<rootDir>/test/jest.setup.ts"],
    testPathIgnorePatterns: [
        "<rootDir>/.next/",
        "<rootDir>/node_modules/",
        "<rootDir>/cypress/",
        "<rootDir>/webdriverio/"
    ],
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/test/styleMock.js",
        ...pathsToModuleNameMapper(paths, { prefix: "<rootDir>/" }),
    },
    transform: {
        "^.+\\.(js|jsx|ts|tsx)$": ["babel-jest", { presets: ["next/babel"] }],
    },
};