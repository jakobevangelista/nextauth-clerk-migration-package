import * as next_navigation from "next/navigation";
import * as node_modules__clerk_nextjs_dist_types_server_protect from "node_modules/@clerk/nextjs/dist/types/server/protect";
import * as _clerk_backend_internal from "@clerk/backend/internal";
import { Session } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

declare function authPatch():
  | (_clerk_backend_internal.SignedInAuthObject & {
      protect: node_modules__clerk_nextjs_dist_types_server_protect.AuthProtect;
      redirectToSignIn: _clerk_backend_internal.RedirectFun<
        ReturnType<typeof next_navigation.redirect>
      >;
    })
  | null;

type UserMetadataParams = {
  publicMetadata?: UserPublicMetadata;
  privateMetadata?: UserPrivateMetadata;
  unsafeMetadata?: UserUnsafeMetadata;
};
type PasswordHasher =
  | "argon2i"
  | "argon2id"
  | "bcrypt"
  | "bcrypt_sha256_django"
  | "md5"
  | "pbkdf2_sha256"
  | "pbkdf2_sha256_django"
  | "pbkdf2_sha1"
  | "phpass"
  | "scrypt_firebase"
  | "scrypt_werkzeug"
  | "sha256";
type UserPasswordHashingParams = {
  passwordDigest: string;
  passwordHasher: PasswordHasher;
};
type CreateUserParams = {
  externalId?: string;
  emailAddress?: string[];
  phoneNumber?: string[];
  username?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  skipPasswordChecks?: boolean;
  skipPasswordRequirement?: boolean;
  totpSecret?: string;
  backupCodes?: string[];
  createdAt?: Date;
} & UserMetadataParams &
  (UserPasswordHashingParams | object);
declare function createMigrationHandler({
  oldCheckHasSession,
  oldGetUserData,
}: {
  oldCheckHasSession: () => Promise<Session | null>;
  oldGetUserData: () => Promise<CreateUserParams>;
}): () => Promise<Response>;

declare function createQueueApiPoint({
  getAllUserIds,
  secret,
  apiPoint,
}: {
  getAllUserIds: () => Promise<
    {
      id: string;
    }[]
  >;
  secret: string;
  apiPoint: string;
}): () => Promise<Response>;

declare function createBatchImportHandler(
  req: NextRequest,
  oldGetUserById: (id: string) => Promise<unknown>
): Promise<NextResponse<unknown>>;

import React from "react";

declare function TrickleWrapper({
  children,
}: {
  children: React.ReactNode;
}): React.JSX.Element;

export {
  authPatch,
  createBatchImportHandler,
  createMigrationHandler,
  createQueueApiPoint,
  TrickleWrapper,
};
