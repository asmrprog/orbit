import { defaultTokens, getTokens, fromPlainObject } from "..";
import foundation from "../foundation";
import convertHexToRgba from "../convertHexToRgba";
import convertRgbaToHex from "../convertRgbaToHex";

describe("defaultTokens", () => {
  it("should match snapshot", () => {
    expect(defaultTokens).toMatchSnapshot();
  });
});

describe("getTokens should accept some palette and base foundation", () => {
  const brand = {
    palette: {
      product: {
        lightHover: "#222",
        lightActive: "#333",
        normal: "#444",
        normalHover: "#555",
        normalActive: "#666",
        dark: "#777",
        darkHover: "#888",
        darkActive: "#999",
        darker: "#005C4E",
      },
    },
    base: {
      fontSizeSm: "16px",
    },
  };
  const theme = getTokens(brand);
  it("should match snapshot", () => {
    expect(theme).toMatchSnapshot();
  });
  it("tokens should have those colors", () => {
    expect(theme.backgroundButtonPrimary).toBe(brand.palette.product.normal);
    expect(theme.colorTextLinkPrimary).toBe(brand.palette.product.dark);
    expect(theme.colorTextButtonPrimaryBordered).toBe(brand.palette.product.normal);
    expect(theme.colorTextButtonPrimaryBorderedHover).toBe(brand.palette.product.normalHover);
    expect(theme.colorTextButtonPrimaryBorderedActive).toBe(brand.palette.product.normalActive);
    expect(theme.paletteProductDarkHover).toBe(brand.palette.product.darkHover);
    expect(theme.paletteProductDarkActive).toBe(brand.palette.product.darkActive);
  });
  it("should deep merge", () => {
    expect(theme.paletteProductLight).toBe(foundation.palette.product.light);
    expect(theme.fontSizeTextNormal).toBe(foundation.base.fontSizeMd);
  });
});

describe("getTokens should accept some base", () => {
  const brand = {
    base: {
      iconSizeSm: "16px",
      iconSizeMd: "20px",
      iconSizeLg: "24px",
      sizeSm: "1px",
      sizeMd: "2px",
      sizeLg: "3px",
      sizeXl: "4px",
      size2xl: "5px",
    },
  };
  const theme = getTokens(brand);
  it("should match snapshot", () => {
    expect(theme).toMatchSnapshot();
  });
  it("tokens should have those colors", () => {
    expect(theme.widthIconSmall).toBe(brand.base.iconSizeSm);
    expect(theme.heightIconSmall).toBe(brand.base.iconSizeSm);
    expect(theme.widthIconMedium).toBe(brand.base.iconSizeMd);
    expect(theme.heightIconMedium).toBe(brand.base.iconSizeMd);
    expect(theme.widthIconLarge).toBe(brand.base.iconSizeLg);
    expect(theme.heightIconLarge).toBe(brand.base.iconSizeLg);
    expect(theme.heightInputNormal).toBe(brand.base.sizeXl);
    expect(theme.heightInputLarge).toBe(brand.base.size2xl);
    expect(theme.heightInputSmall).toBe(brand.base.sizeLg);
    expect(theme.heightButtonNormal).toBe(brand.base.sizeXl);
    expect(theme.heightButtonLarge).toBe(brand.base.size2xl);
    expect(theme.heightButtonSmall).toBe(brand.base.sizeLg);
  });
});

describe("fromPlainObject should create full theme", () => {
  const palette = {
    productLight: "#ff9999",
    productLightHover: "#ff7f7f",
    productLightActive: "#ff6666",
    productNormal: "#ff0000",
    productNormalHover: "#e50000",
    productNormalActive: "#cc0000",
    productDark: "#990000",
  };
  const theme = fromPlainObject(palette);
  it("should match snapshot", () => {
    expect(theme).toMatchSnapshot();
  });
  it("tokens should have those colors", () => {
    expect(theme.backgroundButtonPrimary).toBe(palette.productNormal);
    expect(theme.colorTextLinkPrimary).toBe(palette.productDark);
    expect(theme.colorTextButtonPrimaryBordered).toBe(palette.productNormal);
    expect(theme.colorTextButtonPrimaryBorderedHover).toBe(palette.productNormalHover);
    expect(theme.colorTextButtonPrimaryBorderedActive).toBe(palette.productNormalActive);
  });
  it("tokens should have default darkHover and darkActive", () => {
    expect(theme.paletteProductDarkHover).toBe(foundation.palette.product.darkHover);
    expect(theme.paletteProductDarkActive).toBe(foundation.palette.product.darkActive);
    expect(theme.paletteProductDarker).toBe(foundation.palette.product.darker);
  });
});

describe("fromPlainObject with full object should create full theme", () => {
  const palette = {
    productLight: "#ff9999",
    productLightHover: "#ff7f7f",
    productLightActive: "#ff6666",
    productNormal: "#ff0000",
    productNormalHover: "#e50000",
    productNormalActive: "#cc0000",
    productDark: "#990000",
    productDarkHover: "#820000",
    productDarkActive: "#720000",
    productDarker: "#620000",
  };
  const theme = fromPlainObject(palette);
  it("tokens should have exact darkHover and darkActive", () => {
    expect(theme.paletteProductDarkHover).toBe(palette.productDarkHover);
    expect(theme.paletteProductDarkActive).toBe(palette.productDarkActive);
    expect(theme.paletteProductDarker).toBe(palette.productDarker);
  });
});

describe("convertHexToRgba", () => {
  const colors = {
    lighter: "#bac7d5",
    lighterHover: "#a6b6c8",
    lighterActive: "#94a8be",
    light: "#7f91a8",
    whiteShort: "#fff",
    whiteLong: "#ffffff",
  };
  const finalColors = {
    lighter: "rgba(186, 199, 213, 0.6)",
    lighterHover: "rgba(166, 182, 200, 0.23)",
    lighterActive: "rgba(148, 168, 190, 1)",
    light: "rgba(127, 145, 168, 0)",
    whiteShort: "rgba(255, 255, 255, 0.1)",
    whiteLong: "rgba(255, 255, 255, 1)",
  };
  it("should converts to right RGBA colors", () => {
    expect(convertHexToRgba(colors.lighter, 60)).toBe(finalColors.lighter);
    expect(convertHexToRgba(colors.lighterHover, 23)).toBe(finalColors.lighterHover);
    expect(convertHexToRgba(colors.lighterActive, 100)).toBe(finalColors.lighterActive);
    expect(convertHexToRgba(colors.light, 0)).toBe(finalColors.light);
    expect(convertHexToRgba(colors.whiteShort, 10)).toBe(finalColors.whiteShort);
    expect(convertHexToRgba(colors.whiteLong, 100)).toBe(finalColors.whiteLong);
  });
});

describe("convertRgbaToHex", () => {
  const colors = {
    lighter: "rgba(186, 199, 213, 0.6)",
    lighterHover: "rgba(166, 182, 200, 0.23)",
    lighterActive: "rgba(148, 168, 190, 1)",
    lighterActiveRGB: "rgb(148, 168, 190)",
    transparent: "rgba(127, 145, 168, 0)",
    whiteAlpha: "rgba(255, 255, 255, 0.1)",
    white: "rgb(255, 255, 255)",
  };
  const finalColors = {
    lighter: "#bac7d599",
    lighterHover: "#a6b6c83a",
    lighterActive: "#94a8be",
    light: "#7f91a800",
    whiteShort: "#ffffff19",
    white: "#ffffff",
  };
  it("should converts to right HEX colors", () => {
    expect(convertRgbaToHex(colors.lighter)).toBe(finalColors.lighter);
    expect(convertRgbaToHex(colors.lighterHover)).toBe(finalColors.lighterHover);
    expect(convertRgbaToHex(colors.lighterActive)).toBe(finalColors.lighterActive);
    expect(convertRgbaToHex(colors.lighterActiveRGB)).toBe(finalColors.lighterActive);
    expect(convertRgbaToHex(colors.transparent)).toBe(finalColors.light);
    expect(convertRgbaToHex(colors.whiteAlpha)).toBe(finalColors.whiteShort);
    expect(convertRgbaToHex(colors.white)).toBe(finalColors.white);
  });
});
