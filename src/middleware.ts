import { authMiddleware } from '@kinde-oss/kinde-auth-nextjs/server'

export const config = {
    matcher: ['/auth-callback'],
    // matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
    
}

export default authMiddleware