import NextAuth from "next-auth/next";

declare module "next-auth"{
    interface Session {
        user:{
            email: string,
            _id: string,
            role: string,
            username: string,
            accessToken: string,
            iat: s,
            exp: string,
            jti: string
            refreshToken: string
          }
        
    }
}