#!/usr/bin/env bun
// sync-widgets.ts
// Usage: bun run sync-widgets.ts
// This script checks widgets/registry.yaml and ensures all registries and files are in sync.
/* eslint-disable */
import { readFile, writeFile, access } from "fs/promises";
import chalk from "chalk";
import path from "path";
import yaml from "js-yaml";

const __dirname = import.meta.dirname || process.cwd();

const root = path.resolve(__dirname);
const widgetsDir = path.join(root, "widgets");
const serverProvidersDir = path.join(
  root,
  "server",
  "src",
  "providers",
  "widgets",
);
const serverRegistryPath = path.join(
  root,
  "server",
  "src",
  "providers",
  "index.ts",
);
const webWidgetsDir = path.join(root, "web", "src", "widgets");
const webWidgetMapPath = path.join(webWidgetsDir, "widget.tsx");
const definitionsPath = path.join(widgetsDir, "src", "definitions.ts");
const definitionsText = await readFile(definitionsPath, "utf8");
const registryYamlPath = path.join(widgetsDir, "registry.yaml");

async function fileExists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

async function main() {
  // 1. Read YAML
  const yamlRaw = await readFile(registryYamlPath, "utf8");
  const yamlData = yaml.load(yamlRaw) as any;
  const widgets = Array.isArray(yamlData) ? yamlData : yamlData.widgets;

  const providerImports = widgets
    .map(
      (w: any) =>
        `import { ${capitalize(w.type)}Provider } from "./widgets/${capitalize(w.type)}Provider";`,
    )
    .join("\n");
  const iwpImport =
    'import { IWidgetProvider } from "./widgets/IWidgetProvider";';

  const providersObj = widgets
    .map((w: any) => `  ${w.type}: ${capitalize(w.type)}Provider,`)
    .join("\n");

  const providersFile = `${providerImports}
${iwpImport}

const providers: Record<string, new () => IWidgetProvider> = {
${providersObj}
};

export default providers;
`;

  await writeFile(serverRegistryPath, providersFile);
  console.log(
    chalk.greenBright("[AUTO] Synced providers/index.ts from registry.yaml"),
  );

  // 2. Check for each widget type
  for (const widget of widgets) {
    const type = widget.type;
    // Provider file
    const providerFile = path.join(
      serverProvidersDir,
      `${capitalize(type)}Provider.ts`,
    );
    const providerExists = await fileExists(providerFile);
    if (!providerExists) {
      console.log(
        chalk.yellow(`[WARN] Provider file missing: ${providerFile}`),
      );
      // Autogenerate provider stub
      const providerStub = `import { IWidgetProvider } from "./IWidgetProvider";

export class ${capitalize(type)}Provider implements IWidgetProvider {
  async getValue(config: any): Promise<any> {
    // TODO: Implement ${capitalize(type)} API integration
    return { message: "${capitalize(type)} data not implemented yet" };
  }
}
`;
      await writeFile(providerFile, providerStub);
      console.log(chalk.green(`[AUTO] Created provider stub: ${providerFile}`));
    }
    // Component file
    const componentDir = path.join(webWidgetsDir, type);
    const componentFile = path.join(componentDir, `${type}.tsx`);
    const componentExists = await fileExists(componentFile);
    if (!componentExists) {
      console.log(
        chalk.yellow(`[WARN] Component file missing: ${componentFile}`),
      );
      // Autogenerate component stub
      await fsMkdirIfNotExists(componentDir);
      const componentStub = `export const ${capitalize(type)} = ({ widget }: any) => {
  // TODO: Implement ${capitalize(type)} widget UI
  return (
    <div className="p-4">
      <h2 className="font-bold">${capitalize(type)} Widget</h2>
      <p>Widget ID: {widget?.id}</p>
      <p>${capitalize(type)} integration not implemented yet.</p>
    </div>
  );
};
`;
      await writeFile(componentFile, componentStub);
      console.log(
        chalk.green(`[AUTO] Created component stub: ${componentFile}`),
      );
    }

    // Generate definitions.ts from YAML
    const header = `export const definitions = {\n`;
    const defs = widgets
      .map((w: any) => {
        const configStr =
          w.config && Object.keys(w.config).length > 0
            ? `config: ${toTsObjectLiteral(w.config)},`
            : "config: {},";
        return `  ${w.type}: {\n    type: "${w.type}",\n    label: "${w.label}",\n    category: "${w.category}",\n    layout: ${toTsObjectLiteral(w.layout)},\n    ${configStr}\n  },`;
      })
      .join("\n\n");
    const footer = `\n} as const;\n\nexport type WidgetType = keyof typeof definitions;\n`;
    const newDefinitions = header + defs + footer;
    await writeFile(definitionsPath, newDefinitions);
    console.log(chalk.cyan(`[AUTO] Synced ${widget.label} from registry.yaml`));
    // Definitions registry
    const definitionsText = await readFile(definitionsPath, "utf8");
    // Check if already present
    const alreadyDefined = new RegExp(`\\b${type}: \\{`).test(definitionsText);
    if (!alreadyDefined) {
      // Find where to insert (before closing } as const;)
      const insertPos = definitionsText.lastIndexOf("} as const;");
      if (insertPos === -1) {
        console.log(
          chalk.red(
            "[ERROR] Could not find definitions object in definitions.ts",
          ),
        );
      } else {
        const stub = `  ${type}: {\n    type: \"${type}\",\n    label: \"${capitalize(type)}\",\n    category: \"custom\",\n    layout: { minW: 2, minH: 2, maxW: 4, maxH: 4 },\n    config: {},\n  },\n`;
        const updated =
          definitionsText.slice(0, insertPos) +
          stub +
          definitionsText.slice(insertPos);
        await writeFile(definitionsPath, updated);
        console.log(chalk.green(`[AUTO] Appended ${type} to definitions`));
      }
    }
  }
  console.log(chalk.blueBright("Widget sync check complete."));
}

function toTsObjectLiteral(obj: any, indent = 2): string {
  if (typeof obj !== "object" || obj === null) return JSON.stringify(obj);
  const pad = (n: number) => " ".repeat(n);
  if (Array.isArray(obj)) {
    return `[${obj.map((v) => toTsObjectLiteral(v, indent + 2)).join(", ")}]`;
  }
  return (
    "{\n" +
    Object.entries(obj)
      .map(
        ([k, v]) => `${pad(indent)}${k}: ${toTsObjectLiteral(v, indent + 2)},`,
      )
      .join("\n") +
    `\n${pad(indent - 2)}}`
  );
}

function capitalize(str: string) {
  if (str === str.toUpperCase()) return str;

  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function fsMkdirIfNotExists(dir: string) {
  try {
    await access(dir);
  } catch {
    await import("fs/promises").then((fs) =>
      fs.mkdir(dir, { recursive: true }),
    );
  }
}

main().catch((e) => {
  console.log(chalk.red(e));
  process.exit(1);
});
