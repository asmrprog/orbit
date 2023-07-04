import { QUERIES } from "../utils/mediaQuery/consts";
import { SPACINGS_AFTER } from "./getSpacingToken";

enum ALIGN {
  START = "start",
  CENTER = "center",
  END = "end",
  JUSTIFY = "justify",
}

export const textAlignClasses: {
  [K in QUERIES | ALIGN]: K extends QUERIES ? Record<ALIGN, string> : string;
} = {
  [ALIGN.START]: "text-start",
  [ALIGN.CENTER]: "text-center",
  [ALIGN.END]: "text-end",
  [ALIGN.JUSTIFY]: "text-justify",
  [QUERIES.MEDIUMMOBILE]: {
    [ALIGN.START]: "mm:text-start",
    [ALIGN.CENTER]: "mm:text-center",
    [ALIGN.END]: "mm:text-end",
    [ALIGN.JUSTIFY]: "mm:text-justify",
  },
  [QUERIES.LARGEMOBILE]: {
    [ALIGN.START]: "lm:text-start",
    [ALIGN.CENTER]: "lm:text-center",
    [ALIGN.END]: "lm:text-end",
    [ALIGN.JUSTIFY]: "lm:text-justify",
  },
  [QUERIES.TABLET]: {
    [ALIGN.START]: "tb:text-start",
    [ALIGN.CENTER]: "tb:text-center",
    [ALIGN.END]: "tb:text-end",
    [ALIGN.JUSTIFY]: "tb:text-justify",
  },
  [QUERIES.DESKTOP]: {
    [ALIGN.START]: "de:text-start",
    [ALIGN.CENTER]: "de:text-center",
    [ALIGN.END]: "de:text-end",
    [ALIGN.JUSTIFY]: "de:text-justify",
  },
  [QUERIES.LARGEDESKTOP]: {
    [ALIGN.START]: "ld:text-start",
    [ALIGN.CENTER]: "ld:text-center",
    [ALIGN.END]: "ld:text-end",
    [ALIGN.JUSTIFY]: "ld:text-justify",
  },
};

export const spaceAfterClasses: {
  [K in QUERIES | SPACINGS_AFTER]: K extends QUERIES ? Record<SPACINGS_AFTER, string> : string;
} = {
  [SPACINGS_AFTER.NONE]: "mb-0",
  [SPACINGS_AFTER.SMALLEST]: "mb-xxs",
  [SPACINGS_AFTER.SMALL]: "mb-xs",
  [SPACINGS_AFTER.NORMAL]: "mb-sm",
  [SPACINGS_AFTER.MEDIUM]: "mb-md",
  [SPACINGS_AFTER.LARGE]: "mb-lg",
  [SPACINGS_AFTER.LARGEST]: "mb-xl",
  [QUERIES.MEDIUMMOBILE]: {
    [SPACINGS_AFTER.NONE]: "mm:mb-0",
    [SPACINGS_AFTER.SMALLEST]: "mm:mb-xxs",
    [SPACINGS_AFTER.SMALL]: "mm:mb-xs",
    [SPACINGS_AFTER.NORMAL]: "mm:mb-sm",
    [SPACINGS_AFTER.MEDIUM]: "mm:mb-md",
    [SPACINGS_AFTER.LARGE]: "mm:mb-lg",
    [SPACINGS_AFTER.LARGEST]: "mm:mb-xl",
  },
  [QUERIES.LARGEMOBILE]: {
    [SPACINGS_AFTER.NONE]: "lm:mb-0",
    [SPACINGS_AFTER.SMALLEST]: "lm:mb-xxs",
    [SPACINGS_AFTER.SMALL]: "lm:mb-xs",
    [SPACINGS_AFTER.NORMAL]: "lm:mb-sm",
    [SPACINGS_AFTER.MEDIUM]: "lm:mb-md",
    [SPACINGS_AFTER.LARGE]: "lm:mb-lg",
    [SPACINGS_AFTER.LARGEST]: "lm:mb-xl",
  },
  [QUERIES.TABLET]: {
    [SPACINGS_AFTER.NONE]: "tb:mb-0",
    [SPACINGS_AFTER.SMALLEST]: "tb:mb-xxs",
    [SPACINGS_AFTER.SMALL]: "tb:mb-xs",
    [SPACINGS_AFTER.NORMAL]: "tb:mb-sm",
    [SPACINGS_AFTER.MEDIUM]: "tb:mb-md",
    [SPACINGS_AFTER.LARGE]: "tb:mb-lg",
    [SPACINGS_AFTER.LARGEST]: "tb:mb-xl",
  },
  [QUERIES.DESKTOP]: {
    [SPACINGS_AFTER.NONE]: "de:mb-0",
    [SPACINGS_AFTER.SMALLEST]: "de:mb-xxs",
    [SPACINGS_AFTER.SMALL]: "de:mb-xs",
    [SPACINGS_AFTER.NORMAL]: "de:mb-sm",
    [SPACINGS_AFTER.MEDIUM]: "de:mb-md",
    [SPACINGS_AFTER.LARGE]: "de:mb-lg",
    [SPACINGS_AFTER.LARGEST]: "de:mb-xl",
  },
  [QUERIES.LARGEDESKTOP]: {
    [SPACINGS_AFTER.NONE]: "ld:mb-0",
    [SPACINGS_AFTER.SMALLEST]: "ld:mb-xxs",
    [SPACINGS_AFTER.SMALL]: "ld:mb-xs",
    [SPACINGS_AFTER.NORMAL]: "ld:mb-sm",
    [SPACINGS_AFTER.MEDIUM]: "ld:mb-md",
    [SPACINGS_AFTER.LARGE]: "ld:mb-lg",
    [SPACINGS_AFTER.LARGEST]: "ld:mb-xl",
  },
};
