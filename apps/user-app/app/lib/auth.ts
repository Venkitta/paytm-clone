import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcrypt";

export const authOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            phone: { label: "Phone number", type: "text", placeholder: "1231231231", required: true },
            password: { label: "Password", type: "password", required: true }
          },

          async authorize(credentials: any) {
            if (!credentials?.phone || !credentials?.password) {
                return null;
            }

            const existingUser = await db.user.findFirst({
                where: {
                    number: credentials.phone
                }
            });

            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        name: existingUser.name,
                        email: existingUser.number
                    }
                }
                return null;
            }

            return null
          },
        })
    ],
    secret: process.env.NEXTAUTH_SECRET || "secret",
    pages: {
        signIn: '/auth/signin'
    },
    callbacks: {
        async session({ token, session }: any) {
            session.user.id = token.sub

            return session
        }
    }
  }
  