import type { Config } from "tailwindcss";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";

import { getComponentLevelToken, ExportedComponentLevelTokens } from "../../helpers";

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

const cfg: Config["theme"] = {
  theme: {
    extend: {
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
        default: defaultTokens.zIndexDefault,
        sticky: defaultTokens.zIndexSticky,
        modal: defaultTokens.zIndexModal,
        "modal-overlay": defaultTokens.zIndexModalOverlay,
        overlay: defaultTokens.zIndexModalOverlay,
        drawer: defaultTokens.zIndexDrawer,
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
  },
};

export default cfg;
