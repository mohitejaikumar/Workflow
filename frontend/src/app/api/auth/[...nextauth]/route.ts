import axios from "axios";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text', placeholder: '' },
                password: { label: 'password', type: 'password', placeholder: '' },
            },
            async authorize(credentials: any) {
                const { data } = await axios.post(`${process.env.SERVER_URL}/auth/login`, {
                    email: credentials.email,
                    password: credentials.password
                })
                console.log(data);
                if (data.error) {
                    return null;
                }
                return {
                    id: data.user._id,
                    name: data.user.name,
                    email: data.user.email,
                    jwtToken: data.token,
                };
            },
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        maxAge: 6 * 60 * 60
    },
    pages: {
        signIn: '/auth/login',
    },
    callbacks: {
        jwt: async ({ user, token, account }: any) => {
            if (account) {
                token.provider = account.provider
            }

            if (token.provider == "credentials") {
                token.password = true;
            }
            if (user) {
                token.jwtToken = user.jwtToken;
            }
            return token;
        },
        session: ({ session, token, user }: any) => {
            if (session.user) {
                session.user.jwtToken = token.jwtToken
                session.provider = token.provider
                session.user.password = token.password;
                session.user.name=token.name;
                session.user.id=token.id;
            }
            return session
        }
    }

})

export { handler as GET, handler as POST }