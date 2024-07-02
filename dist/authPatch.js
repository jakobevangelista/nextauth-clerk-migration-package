"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/app/_auth-migration/authPatch.ts
var authPatch_exports = {};
__export(authPatch_exports, {
  auth: () => auth
});
module.exports = __toCommonJS(authPatch_exports);
var import_server = require("@clerk/nextjs/server");
function auth() {
  const ogAuthRes = (0, import_server.auth)();
  if (!ogAuthRes.userId) {
    return null;
  }
  ogAuthRes.userId = ogAuthRes.sessionClaims.userId;
  return ogAuthRes;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  auth
});