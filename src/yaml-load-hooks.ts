import path from "path";
import * as nodeUrl from "node:url";
import {open} from 'node:fs/promises';

export async function initialize(props: any) {
    console.log("Receives data from `register`", props)
}

export async function resolve(specifier: any, context: any, nextResolve: any) {
    console.log("resolving ... Take an `import` or `require` specifier and resolve it to a URL.", specifier, context, nextResolve)
    return nextResolve(specifier, context, nextResolve);
}

export async function load(url: any, context: any, nextLoad: any) {
    console.log("loading ... Take a resolved URL and return the source code to be evaluated.", url, context, nextLoad)

    if (url.endsWith(".yml")) {
        const prefix = path.resolve("./");
        const filePath = nodeUrl.fileURLToPath(url);
        const file = await open(filePath);
        var templateContent = [];
        for await (const line of file.readLines()) {
            templateContent.push(`"${line.replaceAll("\"", "\\\"")}"`)
            console.log("templateContent", templateContent)
        }

        console.log("this is template ", templateContent)

        // const src = `const l = ${templateContent.join(" + \"\\n\" + ")}; export default l;`
        const src = `const l = "ksks; export default l;`

        console.log("this is src ", src)

        const res = {
            format: "module",
            shortCircuit: true,
            source: src
        };
        return res;
    }

    return nextLoad(url, context, nextLoad);
}