# Orbit tailwind preset

This package contains the Orbit Tailwind presets.

Currently, there are two presets available:

- `orbitFoundationPreset` - Orbit's foundation styles, including typography, colors, spacing, etc.
- `orbitComponentsPreset` - Orbit's component tokens. This preset is mainly for Orbit's internal usage and
  migration to Tailwind.

## Installation

```bash
yarn add -D @kiwicom/orbit-tailwind-preset
```

or with npm:

```bash
npm install --save-dev @kiwicom/orbit-tailwind-preset
```

## Usage

In your `tailwind.config.js` file, add the following:

```js
const { orbitFoundationPreset } = require("@kiwicom/orbit-tailwind-preset");

module.exports = {
  presets: [orbitFoundationPreset()],
};
```

It also accepts a configuration object:

```js
const { orbitFoundationPreset } = require("@kiwicom/orbit-tailwind-preset");

module.exports = {
  presets: [
    orbitFoundationPreset({
      // Enable normalizing of the browser's default styles, which is disabled by default
      disabledPreflight: false,
      content: ["./src/**/*.ts"],
    }),
  ],
};
```
