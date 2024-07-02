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

// src/app/_auth-migration/routeHelper.ts
var routeHelper_exports = {};
__export(routeHelper_exports, {
  createMigrationHandler: () => createMigrationHandler,
  dynamic: () => dynamic
});
module.exports = __toCommonJS(routeHelper_exports);
var import_server = require("@clerk/nextjs/server");
var dynamic = "force-dynamic";
function createMigrationHandler({
  oldCheckHasSession,
  oldGetUserData
}) {
  return async function udontknowthepainittooktomakethishappen() {
    const session = await oldCheckHasSession();
    const { userId } = (0, import_server.auth)();
    if (userId) return new Response("User already exists", { status: 222 });
    if (!session?.user?.email)
      return new Response("User not signed into next auth", { status: 222 });
    let createdUser = null;
    try {
      const user = await oldGetUserData();
      if (!user) throw new Error("User not found");
      createdUser = await import_server.clerkClient.users.createUser(user);
    } catch (e) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        e.errors[0].message.includes("That email address is taken")
      ) {
        const searchUser = await import_server.clerkClient.users.getUserList({
          emailAddress: [session.user.email]
        });
        createdUser = searchUser.data[0];
      }
    }
    if (!createdUser) throw new Error("User not created");
    const signInToken = await fetch(
      "https://api.clerk.com/v1/sign_in_tokens",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`
        },
        body: JSON.stringify({
          user_id: createdUser.id
        })
      }
    ).then(async (res) => {
      return await res.json();
    });
    if (!signInToken.token) throw new Error("Sign in token not created");
    return new Response(JSON.stringify({ token: signInToken.token }), {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createMigrationHandler,
  dynamic
});
