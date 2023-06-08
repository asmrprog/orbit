import React from "react";

import { render, screen } from "../../testUtils";
import FontSizes from "../__fixtures__/FontSizes";
import FontWeight from "../__fixtures__/FontWeight";
import LineHeight from "../__fixtures__/LineHeight";

describe("font sizes", () => {
  it("should generate correct styles", () => {
    render(<FontSizes />);

    expect(screen.getByText("Text small")).toHaveStyle({
      fontSize: "13px",
    });

    expect(screen.getByText("Text normal")).toHaveStyle({
      fontSize: "15px",
    });

    expect(screen.getByText("Text large")).toHaveStyle({
      fontSize: "16px",
    });
  });
});

describe("font weights", () => {
  it("should generate correct styles", () => {
    render(<FontWeight />);

    expect(screen.getByText("bold")).toHaveStyle({
      fontWeight: "700",
    });

    expect(screen.getByText("normal")).toHaveStyle({
      fontWeight: "400",
    });

    expect(screen.getByText("medium")).toHaveStyle({
      fontWeight: "500",
    });
  });
});

describe("line heights", () => {
  it("should generate correct styles", () => {
    render(<LineHeight />);

    expect(screen.getByText("leading-small")).toHaveStyle({
      lineHeight: "16px",
    });

    expect(screen.getByText("leading-normal")).toHaveStyle({
      lineHeight: "20px",
    });

    expect(screen.getByText("leading-large")).toHaveStyle({
      lineHeight: "24px",
    });
  });
});
