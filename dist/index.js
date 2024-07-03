// src/app/_auth-migration/authPatch.ts
import { auth as ogAuth } from "@clerk/nextjs/server";
function auth() {
  const ogAuthRes = ogAuth();
  if (!ogAuthRes.userId) {
    return null;
  }
  ogAuthRes.userId = ogAuthRes.sessionClaims.userId;
  return ogAuthRes;
}

// src/app/_auth-migration/routeHelper.ts
import { auth as auth2, clerkClient } from "@clerk/nextjs/server";
function createMigrationHandler({ oldCheckHasSession, oldGetUserData }) {
  return async function udontknowthepainittooktomakethishappen() {
    const session = await oldCheckHasSession();
    const { userId } = auth2();
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

export { auth, createMigrationHandler };
export { TrickleWrapper } from "./wrapper";
