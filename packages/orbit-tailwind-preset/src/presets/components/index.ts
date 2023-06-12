import type { Config } from "tailwindcss";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";

import { getComponentLevelToken, ExportedComponentLevelTokens } from "../foundation/helpers";

const COLORS: Partial<ExportedComponentLevelTokens>[] = [
  "button",
  "buttonLink",
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
          };

          return acc;
        }, {}),
      },
    },
  };
};

export default cfg;
