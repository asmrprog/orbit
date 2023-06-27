import type { Config } from "tailwindcss";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";
import plugin from "tailwindcss/plugin";

import orbitFoundationPreset from "../..";
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
    presets: [orbitFoundationPreset],
    corePlugins: {
      preflight: disablePreflight ? false : undefined,
    },
    theme: {
      extend: {
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
        fontSize: {
          "heading-display": defaultTokens.headingDisplayFontSize,
          "heading-display-subtitle": defaultTokens.headingDisplaySubtitleFontSize,
          "heading-title1": defaultTokens.headingTitle1FontSize,
          "heading-title2": defaultTokens.headingTitle2FontSize,
          "heading-title3": defaultTokens.headingTitle3FontSize,
          "heading-title4": defaultTokens.headingTitle4FontSize,
          "heading-title5": defaultTokens.headingTitle5FontSize,
          "heading-title6": defaultTokens.headingTitle6FontSize,
          "button-large": defaultTokens.buttonLargeFontSize,
          "button-normal": defaultTokens.buttonNormalFontSize,
          "button-small": defaultTokens.buttonSmallFontSize,
          "form-element-normal": defaultTokens.formElementNormalFontSize,
          "form-element-small": defaultTokens.formElementSmallFontSize,
        },
        fontWeight: {
          "heading-display": defaultTokens.fontWeightHeadingDisplay,
          "heading-display-subtitle": defaultTokens.fontWeightHeadingDisplaySubtitle,
          "heading-title1": defaultTokens.fontWeightHeadingTitle1,
          "heading-title2": defaultTokens.fontWeightHeadingTitle2,
          "heading-title3": defaultTokens.fontWeightHeadingTitle3,
          "heading-title4": defaultTokens.fontWeightHeadingTitle4,
          "heading-title5": defaultTokens.fontWeightHeadingTitle5,
          "heading-title6": defaultTokens.fontWeightHeadingTitle6,
          "table-head": String(defaultTokens.fontWeightTableHead),
        },
        lineHeight: {
          heading: defaultTokens.lineHeightHeading,
          "heading-display": defaultTokens.headingDisplayLineHeight,
          "heading-display-subtitle": defaultTokens.headingDisplaySubtitleLineHeight,
          "heading-title1": defaultTokens.headingTitle1LineHeight,
          "heading-title2": defaultTokens.headingTitle2LineHeight,
          "heading-title3": defaultTokens.headingTitle3LineHeight,
          "heading-title4": defaultTokens.headingTitle4LineHeight,
          "heading-title5": defaultTokens.headingTitle5LineHeight,
          "heading-title6": defaultTokens.headingTitle6LineHeight,
          checkbox: defaultTokens.heightCheckbox,
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
