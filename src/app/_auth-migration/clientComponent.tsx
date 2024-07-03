"use client";

import React from "react";
import TrickleWrapper from "./trickleWrapper";

// idk how to do this, when i get access to clerk codebase, ill fix it with
// the code i saw in the dist file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TrickleWrapperComponent(props: any) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  return React.createElement(TrickleWrapper, { ...props });
}

export { TrickleWrapperComponent };
