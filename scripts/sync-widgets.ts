#!/usr/bin/env bun
/* eslint-disable */
import { readFile, writeFile, access, mkdir } from "fs/promises";
import chalk from "chalk";
import path from "path";
import yaml from "js-yaml";

const __dirname = import.meta.dirname || process.cwd();
const root = path.resolve(__dirname, "..");
const appDir = path.join(root, "app");
const serverProvidersDir = path.join(
  appDir,
  "src",
  "server",
  "providers",
  "widgets",
);
const serverRegistryPath = path.join(
  appDir,
  "src",
  "server",
  "providers",
  "index.gen.ts",
);
const widgetsDir = path.join(appDir, "src", "widgets");
const widgetsGenPath = path.join(widgetsDir, "widgets.gen.ts");
const definitionsPath = path.join(widgetsDir, "definitions.gen.ts");
const registryYamlPath = path.join(root, "widget-registry.yaml");

interface WidgetRegistryEntry {
  type: string;
  label: string;
  category: string;
  layout: { minW: number; minH: number; maxW?: number; maxH?: number };
  config?: Record<string, any>;
}

// CLI flag
const args = process.argv.slice(2);
const checkMode = args.includes("--check");

async function fileExists(p: string) {
  try {
    await access(p);
    return true;
  } catch {
    return false;
  }
}

function capitalizeType(type: string) {
  return /^[A-Z0-9]+$/.test(type)
    ? type
    : type[0].toUpperCase() + type.slice(1);
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
      .map(([k, v]) => {
        const safeKey = /^[a-zA-Z_$][\w$]*$/.test(k) ? k : JSON.stringify(k);
        return `${pad(indent)}${safeKey}: ${toTsObjectLiteral(v, indent + 2)},`;
      })
      .join("\n") +
    `\n${pad(indent - 2)}}`
  );
}

async function fsMkdirIfNotExists(dir: string) {
  try {
    await access(dir);
  } catch {
    if (checkMode) {
      console.log(chalk.yellow(`[CHECK] Would create directory: ${dir}`));
    } else {
      await mkdir(dir, { recursive: true });
    }
  }
}

async function writeFileIfNotCheck(path: string, content: string) {
  if (checkMode) {
    console.log(chalk.yellow(`[CHECK] Would write: ${path}`));
  } else {
    await writeFile(path, content);
  }
}

async function generateServerProviders(widgets: WidgetRegistryEntry[]) {
  const imports = widgets
    .map(
      (w) =>
        `import { ${capitalizeType(w.type)}Provider } from "./widgets/${capitalizeType(w.type)}Provider"`,
    )
    .join("\n");

  const providersObj = widgets
    .map((w) => `  ${w.type}: ${capitalizeType(w.type)}Provider,`)
    .join("\n");

  const content = `// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
${imports}
import type { IWidgetProvider } from "./widgets/IWidgetProvider"

const providers: Record<string, new () => IWidgetProvider> = {
${providersObj}
}

export default providers
`;

  await writeFileIfNotCheck(serverRegistryPath, content);
  console.log(chalk.greenBright("[AUTO] Synced server providers"));
}

async function generateWidgetsIndex(widgets: WidgetRegistryEntry[]) {
  const imports = widgets
    .map(
      (w) =>
        `import { ${capitalizeType(w.type)} } from "./${w.type}/${w.type}"`,
    )
    .join("\n");
  const widgetsObj = widgets
    .map((w) => `  ${w.type}: ${capitalizeType(w.type)},`)
    .join("\n");

  const content = `// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
${imports}
import type { WidgetType } from "./definitions.gen"

export const widgets: Record<WidgetType, React.ComponentType<any>> = {
${widgetsObj}
}
`;

  await writeFileIfNotCheck(widgetsGenPath, content);
  console.log(chalk.greenBright("[AUTO] Synced widget components index"));
}

async function generateDefinitions(widgets: WidgetRegistryEntry[]) {
  const header = `// ⚠️ AUTO-GENERATED FILE — DO NOT EDIT
export const definitions = {\n`;

  const defs = widgets
    .map((w) => {
      const configStr =
        w.config && Object.keys(w.config).length > 0
          ? `config: ${toTsObjectLiteral(w.config)},`
          : "config: {},";
      return `  ${w.type}: {
    type: "${w.type}",
    label: "${w.label}",
    category: "${w.category}",
    layout: ${toTsObjectLiteral(w.layout)},
    ${configStr}
  },`;
    })
    .join("\n\n");

  const footer = `\n} as const\n\nexport type WidgetType = keyof typeof definitions\n`;

  await writeFileIfNotCheck(definitionsPath, header + defs + footer);
  console.log(chalk.cyan("[AUTO] Synced widget definitions"));
}

async function ensureStubs(widgets: WidgetRegistryEntry[]) {
  for (const w of widgets) {
    const type = w.type;
    const providerFile = path.join(
      serverProvidersDir,
      `${capitalizeType(type)}Provider.ts`,
    );
    if (!(await fileExists(providerFile))) {
      const stub = `import type { IWidgetProvider } from "./IWidgetProvider"
import type { WidgetConfig } from "./types"

export class ${capitalizeType(type)}Provider implements IWidgetProvider<WidgetConfig<"${type}">> {
  async getValue(config: WidgetConfig<"${type}">): Promise<any> {
    return { message: "${capitalizeType(type)} data not implemented yet", config }
  }
}
`;
      await writeFileIfNotCheck(providerFile, stub);
      if (!checkMode)
        console.log(
          chalk.green(`[AUTO] Created provider stub: ${providerFile}`),
        );
    }

    const componentDir = path.join(widgetsDir, type);
    const componentFile = path.join(componentDir, `${type}.tsx`);
    if (!(await fileExists(componentFile))) {
      await fsMkdirIfNotExists(componentDir);
      const stub = `import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { useWidgetData } from "@/hooks/use-widget-data"
import { WidgetProps } from "../types"

export function ${capitalizeType(type)}({ widget }: WidgetProps) {
  const { data, isLoading } = useWidgetData<any>({ widget })

  if (isLoading || !data) {
    return <Skeleton className="h-full w-full rounded-4xl corner-squircle" />
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>${capitalizeType(type)} Widget</CardTitle>
        <CardDescription>Widget ID: {widget.id}</CardDescription>
      </CardHeader>
      <CardContent>${capitalizeType(type)} widget not implemented yet.</CardContent>
    </Card>
  )
}
`;
      await writeFileIfNotCheck(componentFile, stub);
      if (!checkMode)
        console.log(
          chalk.green(`[AUTO] Created component stub: ${componentFile}`),
        );
    }
  }
}

async function main() {
  const yamlRaw = await readFile(registryYamlPath, "utf8");
  const yamlData = yaml.load(yamlRaw) as any;
  const widgets: WidgetRegistryEntry[] = Array.isArray(yamlData)
    ? yamlData
    : yamlData.widgets;

  // Sort widgets for deterministic output
  widgets.sort((a, b) => a.type.localeCompare(b.type));

  await generateServerProviders(widgets);
  await generateWidgetsIndex(widgets);
  await generateDefinitions(widgets);
  await ensureStubs(widgets);

  console.log(
    chalk.blueBright(
      `Widget sync check complete${checkMode ? " [CHECK MODE]" : ""}.`,
    ),
  );
}

main().catch((e) => {
  console.log(chalk.red(e));
  process.exit(1);
});
