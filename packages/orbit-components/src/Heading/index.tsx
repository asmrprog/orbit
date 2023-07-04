import * as React from "react";
import cx from "classnames";

import { ELEMENT_OPTIONS, TYPE_OPTIONS, ALIGN } from "./consts";
import { spaceAfterClasses, textAlignClasses } from "../common/twCommon";
import { QUERIES } from "../utils/mediaQuery/consts";
import type { Props } from "./types";
import { typeClasses } from "./twClasses";

const Heading = ({
  children,
  type = TYPE_OPTIONS.TITLE1,
  align = ALIGN.START,
  as: Component = ELEMENT_OPTIONS.DIV,
  dataTest,
  inverted = false,
  spaceAfter,
  dataA11ySection,
  id,
  mediumMobile,
  largeMobile,
  tablet,
  desktop,
  largeDesktop,
}: Props) => {
  const viewportClasses = React.useMemo(() => {
    const viewportSpecs = { mediumMobile, largeMobile, tablet, desktop, largeDesktop };

    return Object.values(QUERIES).map(viewport => {
      const viewportProps = viewportSpecs[viewport];

      if (viewportProps == null) {
        return null;
      }

      const { type: vpType, align: vpAlign, spaceAfter: vpSpaceAfter } = viewportProps;
      return [
        vpType && typeClasses[viewport][vpType],
        vpAlign && textAlignClasses[viewport][vpAlign],
        vpSpaceAfter && spaceAfterClasses[viewport][vpSpaceAfter],
      ];
    });
  }, [mediumMobile, largeMobile, tablet, desktop, largeDesktop]);

  return (
    <Component
      id={id}
      data-test={dataTest}
      role={Component === "div" ? "heading" : undefined}
      data-a11y-section={dataA11ySection}
      className={cx(
        "orbit-heading",
        "font-base",
        "m-0",
        inverted ? "text-heading-foreground-inverted" : "text-heading-foreground",
        typeClasses[type],
        textAlignClasses[align],
        spaceAfter && spaceAfterClasses[spaceAfter],
        ...viewportClasses,
      )}
    >
      {children}
    </Component>
  );
};

export default Heading;
