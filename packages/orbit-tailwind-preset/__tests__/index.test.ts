import orbitPreset from "../src";

describe("foundationPreset", () => {
  it("should match snapshot", () => {
    expect(orbitPreset({ disablePreflight: true, includeComponentTokens: true })).toMatchSnapshot();
  });
});
