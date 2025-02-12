import * as React from "react";

import type { Size } from "../common/types";
import type { Type } from "./types";

interface ListContextProps {
  readonly size?: Size | null;
  readonly type?: Type | null;
}

const ListContext = React.createContext<ListContextProps>({
  size: null,
  type: null,
});

ListContext.displayName = "ListOrbitContext";

export default ListContext;
