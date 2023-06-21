import React from "react";
import { defaultTokens } from "@kiwicom/orbit-design-tokens";

import Headings from "../__fixtures__/Headings";
import { render, screen } from "../../testUtils";
import { firstToUpper } from "../foundation/helpers";

const HEADINGS = [
  "title1",
  "title2",
  "title3",
  "title4",
  "title5",
  "title6",
  "display",
  "displaySubtitle",
];

describe("Headings", () => {
  it("should render all heading styles", () => {
    render(<Headings />);
    HEADINGS.forEach(heading => {
      expect(screen.getByText(heading)).toHaveStyle({
        fontSize: defaultTokens[`heading${firstToUpper(heading)}FontSize`],
      });
    });
  });
});
