import NextAuth from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import clientPromise from "@/lib/dbClient";
import authConfig from "./auth.config";
import connectToDatabase from "@/lib/mongodb";
import User from "@/database/user.model";
import bcrypt from "bcryptjs";
import Credentials from "next-auth/providers/credentials";


export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  session: { strategy: "jwt" },
  secret: process.env.AUTH_SECRET,
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        await connectToDatabase();
        if (!credentials?.email || !credentials?.password) return null;

        const user = await User.findOne({ 
          email: (credentials.email as string).toLowerCase() 
        });

        if (!user || !user.password) return null;

        const isPasswordCorrect = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordCorrect) return null;
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.picture,
          role: user.role,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = (user as any).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});