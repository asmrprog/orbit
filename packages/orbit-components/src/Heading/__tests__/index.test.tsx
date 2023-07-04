import * as React from "react";

import { render, screen } from "../../test-utils";
import theme from "../../defaultTheme";
import Heading from "..";
import { ELEMENT_OPTIONS, TYPE_OPTIONS } from "../consts";

describe("Heading", () => {
  it("should have expected DOM output", () => {
    render(
      <Heading as={ELEMENT_OPTIONS.H2} type={TYPE_OPTIONS.TITLE1} dataTest="test" id="id">
        My lovely heading
      </Heading>,
    );
    expect(screen.getByTestId("test")).toBeInTheDocument();
    const heading = screen.getByRole("heading", { name: "My lovely heading" });
    expect(heading.tagName.toLowerCase()).toBe("h2");
    expect(heading).toHaveAttribute("id", "id");
  });

  it("should have expected styles from type", () => {
    render(
      <>
        <Heading dataTest="Title1" type={TYPE_OPTIONS.TITLE1}>
          Title 1
        </Heading>
        <Heading dataTest="Title2" type={TYPE_OPTIONS.TITLE2}>
          Title 2
        </Heading>
        <Heading dataTest="Title3" type={TYPE_OPTIONS.TITLE3}>
          Title 3
        </Heading>
        <Heading dataTest="Title4" type={TYPE_OPTIONS.TITLE4}>
          Title 4
        </Heading>
        <Heading dataTest="Title5" type={TYPE_OPTIONS.TITLE5}>
          Title 5
        </Heading>
        <Heading dataTest="Title6" type={TYPE_OPTIONS.TITLE6}>
          Title 6
        </Heading>
        <Heading dataTest="Display" type={TYPE_OPTIONS.DISPLAY}>
          Title Display
        </Heading>
        <Heading dataTest="DisplaySubtitle" type={TYPE_OPTIONS.DISPLAYSUBTITLE}>
          Title DisplaySubtitle
        </Heading>
      </>,
    );

    const elements = screen.getAllByText(/Title/);
    elements.forEach(element => {
      const type = element.getAttribute("data-test");
      expect(element).toHaveStyle({
        fontSize: theme.orbit[`fontSizeHeading${type}`],
        fontWeight: theme.orbit[`fontWeightHeading${type}`],
        lineHeight: theme.orbit[`lineHeightHeading${type}`],
      });
    });
  });

  it("should align text", () => {
    render(
      <>
        <Heading dataTest="start" align="start">
          start
        </Heading>
        <Heading dataTest="center" align="center">
          center
        </Heading>
        <Heading dataTest="end" align="end">
          end
        </Heading>
        <Heading dataTest="justify" align="justify">
          justify
        </Heading>
      </>,
    );

    expect(screen.getByTestId("start")).toHaveStyle({
      textAlign: "start",
    });
    expect(screen.getByTestId("center")).toHaveStyle({
      textAlign: "center",
    });
    expect(screen.getByTestId("end")).toHaveStyle({
      textAlign: "end",
    });
    expect(screen.getByTestId("justify")).toHaveStyle({
      textAlign: "justify",
    });
  });

  it("should have space after", () => {
    render(
      <>
        <Heading dataTest="none" spaceAfter="none">
          none
        </Heading>
        <Heading dataTest="smallest" spaceAfter="smallest">
          smallest
        </Heading>
        <Heading dataTest="small" spaceAfter="small">
          small
        </Heading>
        <Heading dataTest="normal" spaceAfter="normal">
          normal
        </Heading>
        <Heading dataTest="medium" spaceAfter="medium">
          medium
        </Heading>
        <Heading dataTest="large" spaceAfter="large">
          large
        </Heading>
        <Heading dataTest="largest" spaceAfter="largest">
          largest
        </Heading>
      </>,
    );

    expect(screen.getByTestId("none")).toHaveStyle({
      marginBottom: "0",
    });
    expect(screen.getByTestId("smallest")).toHaveStyle({
      marginBottom: theme.orbit.spaceXXSmall,
    });
    expect(screen.getByTestId("small")).toHaveStyle({
      marginBottom: theme.orbit.spaceXSmall,
    });
    expect(screen.getByTestId("normal")).toHaveStyle({
      marginBottom: theme.orbit.spaceSmall,
    });
    expect(screen.getByTestId("medium")).toHaveStyle({
      marginBottom: theme.orbit.spaceMedium,
    });
    expect(screen.getByTestId("large")).toHaveStyle({
      marginBottom: theme.orbit.spaceLarge,
    });
    expect(screen.getByTestId("largest")).toHaveStyle({
      marginBottom: theme.orbit.spaceXLarge,
    });
  });
});

// Using class assertions for now, because media queries are not supported
describe("Heading with every media query", () => {
  it("should have the correct classes for every media query", () => {
    const dataTest = `test`;
    const defaultClasses =
      "orbit-heading text-heading-title1 leading-heading-title1 font-heading-title1";
    const mediumMobileClasses =
      "mm:text-center mm:text-heading-display mm:leading-heading-display mm:font-heading-display";
    const largeMobileClasses =
      "lm:mb-0 lm:text-heading-title2 lm:leading-heading-title2 lm:font-heading-title2";
    const tabletClasses = "tb:text-heading-title4 tb:leading-heading-title4 tb:font-heading-title4";
    const desktopClasses =
      "de:text-heading-title5 de:leading-heading-title5 de:font-heading-title5 de:uppercase";
    const largeDesktopClasses =
      "ld:text-heading-title6 ld:leading-heading-title6 ld:font-heading-title6";

    render(
      <Heading
        dataTest={dataTest}
        type={TYPE_OPTIONS.TITLE1}
        mediumMobile={{ align: "center", type: TYPE_OPTIONS.DISPLAY }}
        largeMobile={{ spaceAfter: "none", type: TYPE_OPTIONS.TITLE2 }}
        tablet={{ type: TYPE_OPTIONS.TITLE4 }}
        desktop={{ type: TYPE_OPTIONS.TITLE5 }}
        largeDesktop={{ type: TYPE_OPTIONS.TITLE6 }}
      >
        Heading
      </Heading>,
    );

    expect(screen.getByTestId(dataTest)).toHaveClass(
      defaultClasses,
      mediumMobileClasses,
      largeMobileClasses,
      tabletClasses,
      desktopClasses,
      largeDesktopClasses,
    );
  });
});
