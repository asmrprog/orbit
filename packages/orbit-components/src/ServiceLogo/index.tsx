import React from "react";
import styled from "styled-components";

import defaultTheme from "../defaultTheme";
import { SIZE_OPTIONS, baseURL } from "./consts";
import type { Props } from "./types";

const getHeight = (theme: typeof defaultTheme, size: Props["size"]) => {
  const tokens = {
    height: {
      [SIZE_OPTIONS.SMALL]: theme.orbit.heightServiceLogoSmall,
      [SIZE_OPTIONS.MEDIUM]: theme.orbit.heightServiceLogoMedium,
      [SIZE_OPTIONS.LARGE]: theme.orbit.heightServiceLogoLarge,
    },
  };

  if (!size || !tokens.height[size]) return "";

  return tokens.height[size];
};

const getColor = (greyScale: boolean) => (greyScale ? "logos-grayscale" : "logos");

export const StyledServiceLogo = styled(
  ({ className, name, size, grayScale, theme, dataTest, id }) => (
    <img
      className={className}
      src={`${baseURL}/${getColor(grayScale)}/0x${parseInt(
        getHeight(theme, size),
        10,
      )}/${name}.png`}
      srcSet={`${baseURL}/${getColor(grayScale)}/0x${
        parseInt(getHeight(theme, size), 10) * 2
      }/${name}.png 2x`}
      alt={name}
      id={id}
      data-test={dataTest}
    />
  ),
)`
  height: ${({ theme, size }) => getHeight(theme, size)};
  width: auto;
  background-color: transparent;
`;

StyledServiceLogo.defaultProps = {
  theme: defaultTheme,
};

const ServiceLogo = ({
  name,
  size = SIZE_OPTIONS.MEDIUM,
  grayScale = false,
  dataTest,
  id,
}: Props) => (
  <StyledServiceLogo name={name} size={size} grayScale={grayScale} dataTest={dataTest} id={id} />
);

export default ServiceLogo;
