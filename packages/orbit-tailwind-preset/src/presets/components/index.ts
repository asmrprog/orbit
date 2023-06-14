import type { Config } from "tailwindcss";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import plugin from "tailwindcss/plugin";

import {
  kebabCase,
  getComponentLevelToken,
  ExportedComponentLevelTokens,
} from "../foundation/helpers";

const COLORS: Partial<ExportedComponentLevelTokens>[] = [
  "button",
  "buttonLink",
  "socialButton",
  "alert",
  "icon",
  "formElement",
  "badge",
  "tag",
  "textLink",
  "text",
  "heading",
];

interface Options {
  /** default: true e.g. does not include default normalize styles */
  disablePreflight?: boolean;
  /** default: [] */
  content?: Config["content"];
}

const cfg = (options?: Options): Config => {
  const { disablePreflight = true } = options || {};

  return {
    content: ["auto"],
    prefix: "orbit-",
    corePlugins: {
      preflight: disablePreflight ? false : undefined,
    },
    theme: {
      fontSize: {
        ...getComponentLevelToken("heading", "fontSize"),
        ...getComponentLevelToken("button", "fontSize"),
        ...getComponentLevelToken("formElement", "fontSize"),
      },
      fontWeight: {
        ...getComponentLevelToken("heading", "fontWeight"),
        ...getComponentLevelToken("textLink", "fontWeight"),
        "table-head": String(defaultTokens.fontWeightTableHead),
      },
      lineHeight: {
        ...getComponentLevelToken("heading", "lineHeight"),
      },
      zIndex: {
        default: String(defaultTokens.zIndexDefault),
        sticky: String(defaultTokens.zIndexSticky),
        modal: String(defaultTokens.zIndexModal),
        "modal-overlay": String(defaultTokens.zIndexModalOverlay),
        overlay: String(defaultTokens.zIndexModalOverlay),
        drawer: String(defaultTokens.zIndexDrawer),
      },
      height: {
        "icon-small": defaultTokens.heightIconSmall,
        "icon-medium": defaultTokens.heightIconMedium,
        "icon-large": defaultTokens.heightIconLarge,
        "input-normal": defaultTokens.heightInputNormal,
        separator: defaultTokens.heightSeparator,
        "button-small": defaultTokens.heightButtonSmall,
        "button-normal": defaultTokens.heightButtonNormal,
        "button-large": defaultTokens.heightButtonLarge,
        checkbox: defaultTokens.heightCheckbox,
      },
      width: {
        "icon-small": defaultTokens.widthIconSmall,
        "icon-medium": defaultTokens.widthIconMedium,
        "icon-large": defaultTokens.widthIconLarge,
        checkbox: defaultTokens.widthCheckbox,
      },
      padding: {
        ...getComponentLevelToken("button", "padding"),
        ...getComponentLevelToken("formElement", "padding"),
        table: defaultTokens.paddingTable,
      },
      colors: {
        ...COLORS.reduce((acc, name) => {
          // eslint-disable-next-line no-param-reassign
          acc = {
            ...acc,
            ...getComponentLevelToken(name, "background"),
            ...getComponentLevelToken(name, "backgroundHover"),
            ...getComponentLevelToken(name, "backgroundActive"),
            ...getComponentLevelToken(name, "foreground"),
            ...getComponentLevelToken(name, "foregroundHover"),
            ...getComponentLevelToken(name, "foregroundActive"),
            ...getComponentLevelToken(name, "borderColor"),
          };

          return acc;
        }, {}),
      },
      borderColor: {
        ...Object.keys(defaultTokens).reduce((acc, token) => {
          if (token.startsWith("borderColor")) {
            const name = kebabCase(token);
            return { ...acc, [name]: defaultTokens[token] };
          }

          return acc;
        }, {}),
        "radio-disabled": defaultTokens.paletteCloudNormal,
        white: defaultTokens.paletteWhite,
        "radio-hover": defaultTokens.paletteBlueLightActive,
        "radio-active": defaultTokens.paletteBlueNormal,
      },
      keyframes: {
        "slow-pulse": {
          "0%": { opacity: "1" },
          "50%": { opacity: "0.3" },
          "100%": { opacity: "1" },
        },
        spinner: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        loader: {
          "0%": { opacity: "0.3", transform: "translateY(0px)" },
          "20%": { opacity: "1", transform: "translateY(-3px)" },
          "40%": { opacity: "0.3", transform: "translateY(0px)" },
          "100%": { opacity: "0.3", transform: "translateY(0px)" },
        },
        pulse: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(2)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "pulse-slow": "slow-pulse 2s ease-in-out 0.5s infinite",
        spinner: "spinner 0.75s linear infinite",
        loader: "loader 1s 1.25s infinite ease-in-out",
        pulse: "pulse 1.5s infinite",
      },
    },
    plugins: [
      plugin(({ addVariant }) => {
        return (
          addVariant("not-last", "&:not(:last-child)"),
          addVariant("not-first", "&:not(:first-child)"),
          addVariant("type-even", "&:nth-of-type(even)"),
          addVariant("type-odd", "&:nth-of-type(odd)"),
          addVariant("target-blank", "&[target='_blank']")
        );
      }),
    ],
  };
};

export default cfg;
