





import NextAuth from "next-auth";
import CredentialsProvider from 'next-auth/providers/credentials'


import bcrypt from 'bcrypt'

import { signJwtToken } from "@/lib/jwt";
import User from "@/models/User";
import db from "@/lib/db";





const handler = NextAuth({
  providers: [
    CredentialsProvider({
      async authorize(credentials, req) {
        db.connect();

        const { email, password } = credentials;

        // console.log(email, password);

        const user = await User.findOne({ email });

       

        const { avatar } = user; // Use "avatar" instead of "image"


        if (!user) {
          throw new Error("Invalid Email or Password");
        }

        const isPasswordMatched = await bcrypt.compare(password, user.password);

        if (!isPasswordMatched) {
          throw new Error("Invalid Email or Password");
        }

        const { password : userPassword, ...currentUser } = user._doc;

        const accessToken = signJwtToken(currentUser, { expiresIn: '6d' });

       

        
        return {
          ...currentUser,
          accessToken,
          avatar,
          
        };
      },
    }),
  ],

  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        
        token.accessToken = user.accessToken;
        token._id = user._id;
        token.avatar = user.avatar; // Include avatar in the token
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.accessToken = token.accessToken;
        session.user.avatar = token.avatar; // Include avatar in the session
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
