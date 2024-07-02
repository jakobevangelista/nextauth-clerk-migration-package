"use strict";
"use client";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/_auth-migration/trickleWrapper.tsx
var trickleWrapper_exports = {};
__export(trickleWrapper_exports, {
  default: () => TrickleWrapper
});
module.exports = __toCommonJS(trickleWrapper_exports);
var import_nextjs = require("@clerk/nextjs");
var import_p_retry = __toESM(require("p-retry"));
var import_react = require("react");
function TrickleWrapper({
  children
}) {
  const { signIn, setActive } = (0, import_nextjs.useSignIn)();
  const { user } = (0, import_nextjs.useUser)();
  const { session } = (0, import_nextjs.useSession)();
  const fetchRan = (0, import_react.useRef)(false);
  const [signInId, setSignInId] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    console.log("here");
    if (!signIn || !setActive || // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
    session || signInId !== null) {
      return;
    }
    if (!fetchRan.current) {
      const createSignIn = async () => {
        const res = await (0, import_p_retry.default)(
          async () => {
            const res2 = await fetch("/api/auth-migration", {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              }
            });
            if (!res2.ok) {
              throw new Error(res2.statusText);
            }
            return res2;
          },
          {
            retries: 100,
            onFailedAttempt: (error) => {
              console.log(`Attempt ${error.attemptNumber} failed.`);
            }
          }
        );
        let data = null;
        if (res.status === 222) {
          data = { token: "none" };
        } else {
          data = await res.json();
        }
        if (data.token === "none") {
          return;
        }
        try {
          const res2 = await signIn.create({
            strategy: "ticket",
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
            ticket: data.token
          });
          setSignInId(res2.createdSessionId);
          void setActive({
            session: res2.createdSessionId
          });
        } catch (error) {
          console.log("ERROR: ", error);
        }
      };
      void createSignIn();
      return () => {
        fetchRan.current = true;
      };
    }
  }, [signIn, setActive, session, signInId]);
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("div", null, user ? /* @__PURE__ */ React.createElement("div", null, "USER CREATED: ", user.id) : null, /* @__PURE__ */ React.createElement(import_nextjs.UserButton, null), children));
}
