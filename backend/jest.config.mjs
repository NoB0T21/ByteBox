export default {
    preset: "ts-jest",
    testEnvironment: "node",
    roots: ["<rootDir>/tests"],
    transform: {
        "^.+\\.ts?$": "ts-jest",
    },
    testRegex: "((\\.|/)(test|spec))\\.tsx?$",
    moduleFileExtensions: ["ts","tsx","js","json","node"],
};