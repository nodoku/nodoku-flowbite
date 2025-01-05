
export namespace NodokuFlowbiteTailwind {
    export function tailwindConfig(nodeModules: string = "./node_modules"): string[] {
        return [
            `./${nodeModules}/nodoku-flowbite/esm/**/*.js`,
            `./${nodeModules}/nodoku-flowbite/esm/**/*.jsx`,
            `./${nodeModules}/nodoku-flowbite/schemas/**/*.yml`,
            `./${nodeModules}/flowbite/lib/esm/components/carousel/*.js`,
            `./${nodeModules}/flowbite-react/dist/esm/**/*.mjs`,
        ]
    }
}
