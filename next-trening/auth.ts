import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import { db } from "./db/db";
import authConfig from "./auth.config";
import { getUserById } from "./data/user";
import { UserRole } from "@prisma/client";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      console.log("signIn", { user, account, profile, email, credentials });

      console.log("user", user);
      if (user.id) {
        const existingUser = await getUserById(user.id);

        if (account?.provider === "github" || account?.provider === "google") {
          if (user.id) {
            const existingUser = await getUserById(user.id);

            if (existingUser) {
              return true;
            }
          } else {
            const newUser = await db.user.create({
              data: {
                email: user.email,
                name: user.name,
                image: user.image,
                id: user.id,
              },
            });
            console.log("newUser", newUser);
            return true;
          }
        }

        return true;
      }
      return false;
    },

    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole; // Add the 'role' property to the type of 'session.user'
      }

      return session;
    },

    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await getUserById(token.sub);

      if (!existingUser) return token;

      token.role = existingUser.role;

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});
