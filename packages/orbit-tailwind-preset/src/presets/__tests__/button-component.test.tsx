import React from "react";
import { defaultTokens, convertHexToRgba } from "@kiwicom/orbit-design-tokens";

import Button from "../__fixtures__/Button";
import { render, screen } from "../../testUtils";

const firstToUpper = (string: string) => string.charAt(0).toUpperCase() + string.slice(1);

const testIds = ["primary", "secondary", "info", "success", "warning", "critical"];

describe("Button", () => {
  it.each(testIds)("should have correct styles for %s", testId => {
    render(<Button />);

    const button = screen.getByText(testId);

    expect(button).toHaveStyle({
      backgroundColor: convertHexToRgba(
        defaultTokens[`button${firstToUpper(testId)}Background`],
        0,
      ).replace("rgba", "rgb"),
    });
  });
});
