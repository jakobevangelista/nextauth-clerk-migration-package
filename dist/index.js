// src/authPatch.ts
import { auth as ogAuth } from "@clerk/nextjs/server";
function authPatch() {
  const ogAuthRes = ogAuth();
  if (!ogAuthRes.userId) {
    return null;
  }
  ogAuthRes.userId = ogAuthRes.sessionClaims.userId;
  return ogAuthRes;
}

// src/routeHelper.ts
import { auth, clerkClient } from "@clerk/nextjs/server";
function createMigrationHandler({ oldCheckHasSession, oldGetUserData }) {
  return async function udontknowthepainittooktomakethishappen() {
    const session = await oldCheckHasSession();
    const { userId } = auth();
    if (userId) return new Response("User already exists", { status: 222 });
    if (!session?.user?.email)
      return new Response("User not signed into next auth", { status: 222 });
    let createdUser = null;
    try {
      const user = await oldGetUserData();
      if (!user) throw new Error("User not found");
      createdUser = await clerkClient.users.createUser(user);
    } catch (e) {
      if (
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        e.errors[0].message.includes("That email address is taken")
      ) {
        const searchUser = await clerkClient.users.getUserList({
          emailAddress: [session.user.email],
        });
        createdUser = searchUser.data[0];
      }
    }
    if (!createdUser) throw new Error("User not created");
    const signInToken = await fetch("https://api.clerk.com/v1/sign_in_tokens", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CLERK_SECRET_KEY}`,
      },
      body: JSON.stringify({
        user_id: createdUser.id,
      }),
    }).then(async (res) => {
      return await res.json();
    });
    if (!signInToken.token) throw new Error("Sign in token not created");
    return new Response(JSON.stringify({ token: signInToken.token }), {
      status: 201,
      headers: {
        "Content-Type": "application/json",
      },
    });
  };
}

// src/batchQueueApiPoint.ts
function createQueueApiPoint({ getAllUserIds, secret, apiPoint }) {
  return async function lotsofthinking() {
    const userIds = await getAllUserIds();
    for (const id of userIds) {
      await fetch(apiPoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${secret}`,
        },
        body: JSON.stringify({ id }),
      });
    }
    return new Response("Success", {
      status: 200,
    });
  };
}

// src/batchImportHandler.ts
import { NextResponse } from "next/server";
async function createBatchImportHandler(req, oldGetUserById) {
  const body = await req.json();
  console.log(body);
  const user = await oldGetUserById(body.id);
  return new NextResponse(JSON.stringify(user), { status: 200 });
}
export {
  authPatch,
  createBatchImportHandler,
  createMigrationHandler,
  createQueueApiPoint,
};

export { TrickleWrapper } from "./wrapper";
