// Type definitions for @kiwicom/orbit-components
// Project: http://github.com/kiwicom/orbit

import type * as React from "react";

import type * as Common from "../common/types";

export interface Props extends Common.Globals {
  readonly icon?: React.ReactNode;
  readonly checked: boolean;
  readonly ariaLabelledby?: string;
  readonly disabled?: boolean;
  readonly onChange: Common.Event<React.SyntheticEvent<HTMLInputElement>>;
  readonly onFocus?: Common.Event<React.SyntheticEvent<HTMLInputElement>>;
  readonly onBlur?: Common.Event<React.SyntheticEvent<HTMLInputElement>>;
}
