"use client";

import React from "react";
import TrickleWrapper from "./trickleWrapper";

// idk how to do this, when i get access to clerk codebase, ill fix it with
// the code i saw in the dist file
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TrickleWrapperComponent({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-argument
  return <TrickleWrapper>{children}</TrickleWrapper>;
}

export { TrickleWrapperComponent };
