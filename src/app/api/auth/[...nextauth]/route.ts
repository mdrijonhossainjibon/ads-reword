import NextAuth, { Account, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt";
import { JWT } from "next-auth/jwt";
import User  from "@/models/User";
import { connectToDatabase } from "@/lib/mongoose";

declare module 'next-auth' {
  interface User {
    id: string;
    role: string;
  
  }
 
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials");
        }

        try {
          // Here you would typically:
          // 1. Fetch user from your database
          const user = await User.findOne({ email: credentials.email  });
          
          // 2. Verify user exists
          if (!user) throw new Error("No user found");
          
          // 3. Compare passwords
          const isPasswordValid = await compare(credentials.password, user.password);
          /// if (!isPasswordValid) throw new Error("Invalid password");
          
          // 4. Return user object
          return { id: user.id, email: user.email,  role: user.role };
           
        } catch (error) {
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: "/admin/login",
    /* verifyrequest: '/auth/verify-request' */
  },
  callbacks: {
    async signIn({ user, account, profile } : { user: any, account: Account | null, profile: any }) {
      // Validate Google and GitHub sign-in
      if (account?.provider === "google" || account?.provider === "github") {
        await connectToDatabase()
        let users = await User.findOne({ email: profile?.email });
        if (!users) {
          return false
        }
        return true;
      }
      // Allow credential sign-in
      return true;
    },
    
    async jwt({ token, user, account } : { token: JWT, user: any, account: Account | null }) {
      if (account?.provider === "google" || account?.provider === "github") {
        // Fetch the user from database to get the latest data
        await connectToDatabase();
        const dbUser = await User.findOne({ email: token.email });
        if (dbUser) {
          token.id = dbUser._id;
          token.role = dbUser.role;
        }
      }
      return token;
    },

    async session({ session, token } : { session: any, token: JWT }) {
      
      if (session.user) {
        session.user = {
          ...session.user,
          id: token.id,
          role: token.role,
        };
      }
      return session;
    }
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
} as any;

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };