import * as next_navigation from 'next/navigation';
import * as node_modules__clerk_nextjs_dist_types_server_protect from 'node_modules/@clerk/nextjs/dist/types/server/protect';
import * as _clerk_backend_internal from '@clerk/backend/internal';

declare function auth(): (_clerk_backend_internal.SignedInAuthObject & {
    protect: node_modules__clerk_nextjs_dist_types_server_protect.AuthProtect;
    redirectToSignIn: _clerk_backend_internal.RedirectFun<ReturnType<typeof next_navigation.redirect>>;
}) | null;

export { auth };
