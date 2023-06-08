import resolveConfig from "tailwindcss/resolveConfig";

import { orbitFoundationPreset, orbitComponentsPreset } from "../..";

describe("foundationPreset", () => {
  it("should match snapshot", () => {
    const cfg = resolveConfig(orbitFoundationPreset);
    expect(cfg).toMatchSnapshot();
    expect(cfg.corePlugins).not.toContain("preflight");
  });
});

describe("componentsPreset", () => {
  it("should match snapshot", () => {
    const cfg = resolveConfig(orbitComponentsPreset());
    expect(cfg.corePlugins).not.toContain("preflight");
    expect(cfg).toMatchSnapshot();
  });

  it("should have preflight enabled", () => {
    const config = resolveConfig(orbitComponentsPreset({ disablePreflight: false }));
    expect(config.corePlugins).toContain("preflight");
  });
});
