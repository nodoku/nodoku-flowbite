export var NodokuFlowbiteTailwind;
(function (NodokuFlowbiteTailwind) {
    function tailwindConfig(nodeModules) {
        if (nodeModules === void 0) { nodeModules = "./node_modules"; }
        return [
            "./".concat(nodeModules, "/nodoku-flowbite/esm/**/*.js"),
            "./".concat(nodeModules, "/nodoku-flowbite/esm/**/*.jsx"),
            "./".concat(nodeModules, "/nodoku-flowbite/schemas/**/*.yml"),
            "./".concat(nodeModules, "/flowbite/lib/esm/components/carousel/*.js"),
            // `./${nodeModules}/flowbite-react/dist/esm/**/*.mjs`,
        ];
    }
    NodokuFlowbiteTailwind.tailwindConfig = tailwindConfig;
})(NodokuFlowbiteTailwind || (NodokuFlowbiteTailwind = {}));
//# sourceMappingURL=index.js.map