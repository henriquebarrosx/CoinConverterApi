module.exports = {
    presets: [
        [
            '@babel/preset-env',
            {
                targets: {
                    node: 'current'
                }
            }
        ],
        '@babel/preset-typescript'
    ],
    plugins: [
        ['module-resolver', {
            alias: {
                "@common-types": "./src/common-types",
                "@providers": "./src/providers",
                "@entities": "./src/v1/entities",
                "@repositories": "./src/v1/repositories",
                "@useCases": "./src/v1/useCases",
                "@exceptions": "./src/exception",
                "@middlewares": "./src/v1/middleware",
            }
        }]
    ],
    ignore: [
        '**/*.test.ts'
    ]
} 