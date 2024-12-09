import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import db from '@/app/lib/db'

const authOptions = {
  providers: [
    CredentialsProviders({
      name: "Credentials",
      credentials: {
        email: {
          label: "Correo",
          type: "text",
          placeholder: "Correo electrónico",
        },
        password: {
          label: "Contraseña",
          type: "password",
          placeholder: "Contraseña",
        },
      },
      async authorize(credentials, req) {
        console.log("cred:" + credentials)

        const userFound = await db.Usuario.findUnique({
            where: {
                email: credentails.email
            }
        })

        console.log("user:" + userFound)
        if (!userFound) return null

        return {
            id: userFound.id,
            name: userFound.firstName,
            email: userFound.email
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}