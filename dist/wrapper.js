"use client";
// src/app/_auth-migration/trickleWrapper.tsx
import { UserButton, useSession, useSignIn, useUser } from "@clerk/nextjs";
import pRetry from "p-retry";
import { useEffect, useRef, useState } from "react";
import React from "react";
function TrickleWrapper({ children }) {
  const { signIn, setActive } = useSignIn();
  const { user } = useUser();
  const { session } = useSession();
  const fetchRan = useRef(false);
  const [signInId, setSignInId] = useState(null);
  useEffect(() => {
    console.log("here");
    if (
      !signIn ||
      !setActive || // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
      session ||
      signInId !== null
    ) {
      return;
    }
    if (!fetchRan.current) {
      const createSignIn = async () => {
        const res = await pRetry(
          async () => {
            const res2 = await fetch("/api/auth-migration", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
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
            },
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
            ticket: data.token,
          });
          setSignInId(res2.createdSessionId);
          void setActive({
            session: res2.createdSessionId,
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
  return /* @__PURE__ */ React.createElement(
    React.Fragment,
    null,
    /* @__PURE__ */ React.createElement(
      "div",
      null,
      user
        ? /* @__PURE__ */ React.createElement(
            "div",
            null,
            "USER CREATED: ",
            user.id
          )
        : null,
      /* @__PURE__ */ React.createElement(UserButton, null),
      children
    )
  );
}
export { TrickleWrapper };
