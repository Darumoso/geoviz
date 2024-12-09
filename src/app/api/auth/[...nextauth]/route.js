import NextAuth from 'next-auth'
import CredentialsProviders from 'next-auth/providers/credentials'

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
      authorize(credentials, req) {
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export {handler as GET, handler as POST}