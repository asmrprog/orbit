import React from "react";
import cx from "classnames";

import { baseURL, CODES, SIZE_WIDTHS, SIZES } from "./consts";
import type { Props } from "./types";

const Wrapper = ({ children, size }) => {
  return (
    <div
      className={cx("relative bg-country-flag-background rounded-small overflow-hidden shrink-0", {
        "w-country-flag-small h-country-flag-small": size === SIZES.SMALL,
        "w-country-flag-medium h-country-flag-medium": size === SIZES.MEDIUM,
      })}
    >
      {children}
    </div>
  );
};

const Image = ({
  code,
  name,
  id,
  dataTest,
  src,
  srcSet,
}: {
  code: Props["code"];
  name: Props["name"];
  id: Props["id"];
  dataTest: Props["dataTest"];
  src: string;
  srcSet: string;
}) => (
  <img
    className="block h-full w-full shrink-0"
    key={code}
    alt={name}
    title={name}
    id={id}
    data-test={dataTest}
    src={src}
    srcSet={srcSet}
  />
);

const Shadow = () => (
  <div className="absolute block h-full w-full top-0 right-0 bottom-0 left-0 shadow-country-flag rounded-small" />
);

function getCountryProps(code?: string, name?: string) {
  const codeNormalized = code ? code.toUpperCase().replace("-", "_") : "UNDEFINED";
  const countryCodeExists = codeNormalized in CODES;

  if (!countryCodeExists) console.warn(`Country code not supported: ${code}`);

  const countryCode = countryCodeExists ? CODES[codeNormalized] : CODES.UNDEFINED;
  const countryName = countryCode === CODES.UNDEFINED && !name ? "Undefined" : name;
  return { code: countryCode, name: countryName };
}

const CountryFlag = ({ dataTest, size = SIZES.MEDIUM, id, ...props }: Props) => {
  const { code, name } = getCountryProps(props.code, props.name);

  const width = SIZE_WIDTHS[size];
  const src = `${baseURL}/flags/${width}x0/flag-${code.toLowerCase()}.jpg`;
  const srcSet = `${baseURL}/flags/${width * 2}x0/flag-${code.toLowerCase()}.jpg 2x`;

  return (
    <Wrapper size={size}>
      <Image code={code} name={name} id={id} dataTest={dataTest} src={src} srcSet={srcSet} />
      <Shadow />
    </Wrapper>
  );
};

export default CountryFlag;
