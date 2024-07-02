import { Session } from 'next-auth';

declare const dynamic = "force-dynamic";
type UserMetadataParams = {
    publicMetadata?: UserPublicMetadata;
    privateMetadata?: UserPrivateMetadata;
    unsafeMetadata?: UserUnsafeMetadata;
};
type PasswordHasher = "argon2i" | "argon2id" | "bcrypt" | "bcrypt_sha256_django" | "md5" | "pbkdf2_sha256" | "pbkdf2_sha256_django" | "pbkdf2_sha1" | "phpass" | "scrypt_firebase" | "scrypt_werkzeug" | "sha256";
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
} & UserMetadataParams & (UserPasswordHashingParams | object);
declare function createMigrationHandler({ oldCheckHasSession, oldGetUserData, }: {
    oldCheckHasSession: () => Promise<Session | null>;
    oldGetUserData: () => Promise<CreateUserParams>;
}): () => Promise<Response>;

export { type CreateUserParams, createMigrationHandler, dynamic };
