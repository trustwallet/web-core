
module.exports = {
    "roots": [
        "packages/"
    ],
    "transform": {
        "^.+\\.tsx?$": "ts-jest"
    },
    "collectCoverageFrom": [
        'packages/*/src/**/*.{js,ts,tstx}',
        '!**/node_modules/**'
    ],
    "coverageDirectory": "./coverage",
    "setupFiles": [
    ]
};
