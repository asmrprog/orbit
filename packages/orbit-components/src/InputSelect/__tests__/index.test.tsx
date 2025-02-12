import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import userEvent from "@testing-library/user-event";

import InputSelect from "..";

const jetLiOption = {
  title: "Jet Li",
  value: "Li",
  description: "Jet Li is a Chinese actor.",
  group: "Asian",
};

const options = [
  {
    title: "Chuck Norris",
    value: "Norris",
    description:
      "Chuck Norris is an American martial artist, actor, film producer and screenwriter.",
  },
  {
    title: "Bruce Lee",
    value: "Lee",
    description: "Bruce Lee was a Hong Kong American martial artist.",
    group: "American",
  },
  {
    title: "Jackie Chan",
    value: "Chan",
    description: "Jackie Chan is a Hong Kongese actor.",
    group: "Asian",
  },
  {
    ...jetLiOption,
  },
];

describe("InputSelect", () => {
  const label = "Choose your actor";
  const name = "actors";
  const id = "kek";
  const emptyMessage = "D'oh! No results found.";

  it("should render expected DOM output", async () => {
    const onChange = jest.fn();
    const onOptionSelect = jest.fn();
    const onKeyDown = jest.fn();
    const onClose = jest.fn();

    render(
      <InputSelect
        id={id}
        label={label}
        options={options}
        name={name}
        emptyStateMessage={emptyMessage}
        onKeyDown={onKeyDown}
        onOptionSelect={onOptionSelect}
        onChange={onChange}
        onClose={onClose}
      />,
    );

    userEvent.tab();

    const input = screen.getByRole("combobox");
    const dropdown = screen.getByRole("listbox");

    // after focus dropdown should have all options grouped and then show all of them
    const totalOptions = 2 + 1 + 4; // (2 asian, 1 american, 4 all)
    expect(screen.getAllByRole("option")).toHaveLength(totalOptions);
    expect(screen.queryByText("All options")).toBeInTheDocument();
    expect(screen.queryByText("Other options")).not.toBeInTheDocument();

    // should have expected aria attributes
    expect(input).toHaveAttribute("aria-expanded", "true");
    expect(input).toHaveAttribute("aria-autocomplete", "list");
    expect(input).toHaveAttribute("aria-haspopup", "true");
    expect(input).toHaveAttribute("aria-controls", dropdown.id);

    expect(input).toBeInTheDocument();
    expect(dropdown).toBeInTheDocument();
    expect(screen.getByLabelText(label)).toBeInTheDocument();
    expect(input).toHaveAttribute("name", name);
    expect(input).toHaveAttribute("id", id);

    // clear current value
    userEvent.clear(input);

    // test empty message
    userEvent.type(input, "Arnold");
    expect(screen.getByText(emptyMessage)).toBeInTheDocument();

    // test dropdown result filtering
    userEvent.clear(input);
    userEvent.type(input, "J");
    expect(onChange).toHaveBeenCalled();

    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getByText("Jet Li")).toBeInTheDocument();
    expect(screen.getByText("Jackie Chan")).toBeInTheDocument();

    // test navigating by arrow keys
    fireEvent.keyDown(input, { key: "ArrowDown" });

    expect(onKeyDown).toHaveBeenCalled();

    // should select by click
    userEvent.click(screen.getByText("Jet Li"));

    expect(onOptionSelect).toHaveBeenCalledWith(jetLiOption);

    // test selecting by enter and space
    fireEvent.keyDown(input, { key: "Enter" });
    expect(onOptionSelect).toHaveBeenCalledWith(jetLiOption);

    fireEvent.keyDown(input, { key: "Space" });
    expect(onOptionSelect).toHaveBeenCalledWith(jetLiOption);

    // test closing dropdown by ESC
    fireEvent.keyDown(input, { key: "Escape" });
    expect(dropdown).not.toBeInTheDocument();
    expect(onClose).toHaveBeenCalled();

    // test clear of the input by button and reset of filtered options
    userEvent.tab();
    userEvent.click(screen.getByLabelText("Clear"));
    expect(onOptionSelect).toBeCalledWith(null);
    expect(screen.getByRole("textbox")).toHaveValue("");
    expect(screen.getAllByRole("option")).toHaveLength(totalOptions);
  });

  it("can have a default selected value", () => {
    const onClose = jest.fn();

    render(
      <InputSelect
        id={id}
        label={label}
        options={options}
        name={name}
        defaultSelected={jetLiOption}
        onClose={onClose}
      />,
    );

    userEvent.tab();

    const input = screen.getByRole("combobox");

    expect(input).toHaveValue(jetLiOption.title);

    // Simulate closing to assert the selected value is the default
    fireEvent.keyDown(input, { key: "Escape" });
    expect(onClose).toHaveBeenCalledWith(jetLiOption);
  });

  it("can have prevSelected defined", () => {
    const prevSelectedLabel = "Formerly selected";

    render(
      <InputSelect
        id={id}
        label={label}
        options={options}
        name={name}
        prevSelected={jetLiOption}
        prevSelectedLabel={prevSelectedLabel}
      />,
    );

    userEvent.tab();

    expect(screen.queryByText("Previously selected")).not.toBeInTheDocument();
    expect(screen.queryByText(prevSelectedLabel)).toBeInTheDocument();
    expect(screen.getAllByRole("option")).toHaveLength(1 + 2 + 1 + 4); // (1 previously selected, 2 asian, 1 american, 4 all)
  });

  describe("when showAll is false", () => {
    it("should not render repeated options", () => {
      const showAllLabel = "Those without a group";
      render(<InputSelect options={options} showAll={false} showAllLabel={showAllLabel} />);
      userEvent.tab();

      // after focus dropdown should have all options grouped and then show only the ones without a group
      expect(screen.getAllByRole("option")).toHaveLength(2 + 1 + 1); // (2 asian, 1 american, 1 ungrouped)
      expect(screen.queryByText("All options")).not.toBeInTheDocument();
      expect(screen.queryByText("Other options")).not.toBeInTheDocument();
      expect(screen.queryByText(showAllLabel)).toBeInTheDocument();
    });
  });
});
