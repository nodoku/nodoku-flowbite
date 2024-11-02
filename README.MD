



**_nodoku-flowbite_** is a set of visual components to be used with the [Nodoku static site generator](https://github.com/nodoku/nodoku-core).

The components provided in the **_nodoku-flowbite_** library are based on [flowbite](https://github.com/themesberg/flowbite) and [flowbite-react](https://github.com/themesberg/flowbite-react).

The components in the nodoku-flowbite library are styled using Tailwind CSS.

All the Nodoku components support localization out of the box. 

One needs to provide the i18n provider parameter to the Nodoku root component - RenderingPage.

See [nodoku-i18n](https://github.com/nodoku/nodoku-i18n) for more details 

# Getting started

## Installation

The installation of the nodoku-flowbite library is straightforward:

```shell
npm install nodoku-core nodoku-flowbite
```

## Running generation scripts

Once the installation is performed, one needs to run the following scripts in order to generate the [Nodoku component resolver](https://github.com/nodoku/nodoku-core?tab=readme-ov-file#nodoku-component-resolver) and [Nodoku skin schema](https://github.com/nodoku/nodoku-core?tab=readme-ov-file#schema-for-nodoku-skin-yaml-file).  

AFter the generation scripts are executed, the following new files should appear in the project tree:

- **_src/nodoku-component-resolver.ts_**
  - the file resolving the textual names of the components to an actual JS function implementing the compoent


- **_schemas/visual-schema.json_**
  - this JSON file is a schema to be used for Nodoku skin Yaml file. 

The component resolver should be having the following lines now:

```ts
components.set("flowbite/card", { ... });
components.set("flowbite/horizontal-card", { ... });
components.set("flowbite/carousel", { ... });
components.set("flowbite/jumbotron", { ... });
```

There are several techniques to apply the JSON schema to a Yaml file, and they in particular depend on your development environment.

For example, [this link](https://www.jetbrains.com/help/idea/yaml.html#json_schema) shows the steps to follow for IntelliJ family products.

Alternatively, one can consider using the following option: add the following line to the top of the Yaml where the schema should be applied:

```yaml
# yaml-language-server: $schema=../../../schemas/visual-schema.json
```

like this:

```yaml
# yaml-language-server: $schema=../../../schemas/visual-schema.json

rows:
  - row:
      components:
        - flowbite/carousel:

```

## Configuring Tailwind

nodoku-flowbite is a library of Nodoku visual components, based on flowbite and react-flowbite.

**_flowbite_** and **_react-flowbite_** are the libraries heavily relying on Tailwind CSS, and so is **_nodoku-flowibte_**.

Here is the Tailwind CSS config to be used with the project:

```ts
import flowbite from "flowbite-react/tailwind";
import type {Config} from "tailwindcss";

const config: Config = {
    content: [
        "./src/**/*.ts",
        "./src/**/*.tsx",
        "./src/**/*.js",
        "./src/**/*.jsx",
        "./schemas/**/*.yml",

        "./node_modules/nodoku-core/dist/esm/**/*.js",
        "./node_modules/nodoku-core/dist/esm/**/*.jsx",
        "./node_modules/nodoku-components/dist/esm/**/*.js",
        "./node_modules/nodoku-components/dist/esm/**/*.jsx",
        "./node_modules/nodoku-flowbite/dist/esm/**/*.js",
        "./node_modules/nodoku-flowbite/dist/esm/**/*.jsx",
        "./node_modules/nodoku-flowbite/dist/schemas/**/*.yml",
        "./public/**/*.html",
        "./src/**/*.{html,js}",
        "./public/site/**/*.yaml",
        flowbite.content(),
    ],
    plugins: [
        flowbite.plugin(),
    ],
};


export default config;

```

The main point behind this config is to make the Tailwind plugin to scan all the places where the Tailwind classnames can potentially be encountered.

This includes not only the .js/.jsx files that the bundle contains, but also the Yaml files that the bundle brings in, as the Yaml files contain the default theme configuration of a bundle in terms of Tailwind classes.





