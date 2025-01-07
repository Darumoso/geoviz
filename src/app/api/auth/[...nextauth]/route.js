import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'
import db from '@/app/lib/db'
import bcrypt from 'bcrypt'

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
            const userFound = await db.Usuario.findUnique({
                where: {
                    email: credentials.email
                }
            })
            if (!userFound) return null

            const isPasswordValid = await bcrypt.compare(credentials.password, userFound.password);
            if (!isPasswordValid) return null;


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