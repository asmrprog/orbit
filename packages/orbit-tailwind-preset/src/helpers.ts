import type { defaultFoundation } from "@kiwicom/orbit-design-tokens";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import type { Config } from "tailwindcss";

const PREFIX = "orbit-";

export interface Options {
  /** default: `true` eg does not include the tailwind preflight */
  disablePreflight?: boolean;
  /** default: [] */
  content: [];
}

const kebabCase = (str: string) => str.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();

export type ExportedComponentLevelTokens =
  | "alert"
  | "button"
  | "buttonLink"
  | "badge"
  | "tag"
  | "textLink"
  | "text"
  | "heading"
  | "formBox"
  | "illustration"
  | "formElement"
  | "table"
  | "switch"
  | "tooltip"
  | "carrierLogo"
  | "countryFlag"
  | "socialButton"
  | "card";

type ExportedComponentLevelTypes =
  | "background"
  | "backgroundHover"
  | "backgroundActive"
  | "foreground"
  | "foregroundHover"
  | "foregroundActive"
  | "fontSize"
  | "fontWeight"
  | "lineHeight";

type KebabCase<S extends string> = S extends `${infer T}${infer U}`
  ? U extends Uncapitalize<U>
    ? `${Uncapitalize<T>}${KebabCase<U>}`
    : `${Uncapitalize<T>}-${KebabCase<U>}`
  : S;

type TransformedTokens = Record<KebabCase<keyof typeof defaultFoundation>, Record<string, string>>;

export const transformToKebabCase = (tokens: typeof defaultFoundation): TransformedTokens => {
  if (typeof tokens !== "object") return tokens;

  return Object.keys(tokens).reduce((acc, key) => {
    const kebabKey = kebabCase(key);
    const value = tokens[key];

    if (typeof value === "object") {
      acc[kebabKey] = transformToKebabCase(value);
    } else {
      acc[kebabKey] = value;
    }

    return acc;
  }, {} as TransformedTokens);
};

export const getComponentLevelToken = (
  component: ExportedComponentLevelTokens,
  type: ExportedComponentLevelTypes,
) => {
  return Object.keys(defaultTokens).reduce((acc, key) => {
    const k = key.toLowerCase();
    const c = component.toLowerCase();
    const t = type.toLowerCase();

    if (k.startsWith(c) && k.endsWith(t)) {
      if (defaultTokens[key]) {
        acc[kebabCase(key)] = defaultTokens[key];
      }
    }

    return acc;
  }, {});
};

type PresetCfg = (cfg: Partial<Config>, options: Options) => Config;

export const presetCfg: PresetCfg = (cfg, { content = [], disablePreflight = true }): Config => ({
  prefix: PREFIX,
  content,
  // do not include default tailwind config
  presets: [],
  corePlugins: {
    preflight: disablePreflight,
  },
  ...cfg,
});
