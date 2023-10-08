// STORE DATA OF CURRENTLY LOGGED IN USER
import { getServerSession } from "next-auth/next";
import { NextAuthOptions, User } from "next-auth";
import { AdapterUser } from "next-auth/adapters";
import GoogleProvider from "next-auth/providers/google";
// import jsonwebtoken from "jsonwebtoken";
// import { JWT } from "next-auth/jwt";
import { SessionInterface } from "@/common.types";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  // connect grafbase to nextAuth
  //   jwt: {
  //     encode: ({ secret, token }) => {},
  //     decode: async ({ secret, token }) => {},
  //   },
  theme: {
    colorScheme: "light",
    logo: "/logo.svg",
  },
  callbacks: {
    async session({ session }) {
      return session;
    },
    // DIFFERENTIATE BETWEEN GOOGLE AND DATABASE USER
    async signIn({ user }: { user: AdapterUser | User }) {
      try {
        // GET USER: if they exist
        // if they don't, create them
        return true;
      } catch (error: any) {
        console.error(error);
        return false;
      }
    },
  },
};

export async function getCurrentUser() {
  const session = (await getServerSession(authOptions)) as SessionInterface;

  return session;
}
