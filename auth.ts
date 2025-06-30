import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import { AUTHOR_BY_GITHUB_ID_QUERY } from "@/sanity/lib/queries";
import { client } from "@/sanity/lib/client";
import { writeClient } from "@/sanity/lib/write-client";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [GitHub],
  callbacks: {
    async signIn({ user, profile }) {
      if (!profile?.id) return false;

      const existingUser = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
        id: profile.id.toString(),
      });

      if (!existingUser) {
        await writeClient.create({
          _type: "author",
          id: profile.id.toString(),
          name: user.name,
          username: profile.login,
          email: user.email,
          image: user.image,
          bio: profile.bio || "",
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        const user = await client.fetch(AUTHOR_BY_GITHUB_ID_QUERY, {
          id: profile.id.toString(),
        });
        
        if (user) {
          token.id = user._id;
        }
      }
      return token;
    },

    async session({ session, token }) {
      if (token.id && session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
});