import type { Config } from "tailwindcss";

import defaultFoundation from "./theme/defaultFoundation";
import { spacing, screens, font, boxShadow, duration } from "./theme";

const config: Config = {
  content: ["auto"],
  prefix: "orbit-",
  corePlugins: {
    preflight: false,
  },
  theme: {
    colors: defaultFoundation.palette,
    spacings: spacing,
    borderRadius: defaultFoundation["border-radius"],
    screens,
    lineHeight: defaultFoundation["line-height"],
    boxShadow,
    transitionDuration: duration,
    ...font,
  },
};

export default config;
