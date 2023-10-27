import axios from "axios"
import { NextAuthOptions } from "next-auth"
import NextAuth from "next-auth/next"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
          // The name to display on the sign in form (e.g. 'Sign in with...')
          name: 'Credentials',
          // The credentials is used to generate a suitable form on the sign in page.
          // You can specify whatever fields you are expecting to be submitted.
          // e.g. domain, username, password, 2FA token, etc.
          // You can pass any HTML attribute to the <input> tag through the object.
          credentials: {},
          async authorize(credentials, req) {
            const {email, password } = credentials as any
            const data = {email,password}
            const res = await axios.post(`${process.env.BACKEND_URL}/auth/login`, data)
            const user = await res.data.data.user
            // If no error and we have user data, return it
            if (res.statusText === "OK" && user) {
              user.accessToken = res.data.data.accessToken
              user.refreshToken = res.data.data.refreshToken
              return user
            }
            // Return null if user data could not be retrieved
            return null
          }
        })
      ],
      callbacks: {
        async jwt({ token, user }) {         
          return { ...token, ...user };
        },
        async session({ session, token, user }) {          
          session.user = token as any;
          return session;
        },
      },
      secret: process.env.JWT_SECRET,
      pages: {
        signIn: '/login',
      }
}


const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };