import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";

import User from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";
 


export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || ""
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        username: { label: "Username", type: "text" },
        userId: { label: "UserId", type: "text" },
        first_name: { label: "First Name", type: "text" },
        photo_url: { label: "Photo URL", type: "text" },

      },
      async authorize(credentials) {


        
         

        await connectToDatabase();

        if (!credentials) {
          throw new Error('Invalid credentials');
        }

        if (credentials.userId && credentials.userId) {
          const user = await User.findOne({ telegramId: credentials.userId });
          if (!user) {
            throw new Error('Invalid credentials');
          }
          return {
            id: user._id,
            email: user.email,
            role: user.role,
            username: user.username,
            telegramId: user.telegramId
          }
        }

 
        const user = await User.findOne({ email: credentials?.email });
 
        if (!user || !user?.password) {
          throw new Error('Invalid credentials');
        }

        const isPasswordValid = await compare(
          credentials.password,
          user.password
        );

        if (!isPasswordValid) {
          throw new Error('Invalid credentials');
        }

        return {
          id: user._id,
          email: user.email,
          role: user.role,
          username: user.username,
          telegramId: user.telegramId
        };
      }
    }),

  ],
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/signout',
    error: '/auth/error', // Error code passed in query string as ?error=
    verifyRequest: '/auth/verify-request', // (used for check email message)
    newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      let isAllowed = false;
      if (account?.provider === "credentials") {
        return true;
      }

      if(account?.provider === 'google'){
        const user = await User.findOne({ email: profile?.email });
        isAllowed = !!user;
      }

      if(account?.provider === 'github'){
        const user = await User.findOne({ email: profile?.email });
        isAllowed = !!user;
      }
       
      return  isAllowed;
    },
    async jwt({ token, user, account }: any) {
 
 

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.username = user.username;
        token.telegramId = user.telegramId;
        token.firstName = user.firstName;
        token.photoUrl = user.photoUrl;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (session?.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.username = token.username;
        session.user.telegramId = token.telegramId;
        session.user.firstName = token.firstName;
        session.user.photoUrl = token.photoUrl;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
};
