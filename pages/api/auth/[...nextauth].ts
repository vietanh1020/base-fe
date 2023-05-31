import NextAuth, { NextAuthOptions, RequestInternal } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

interface User {
  id: string;
  name: string;
  role: string;
  accessToken: string;
  refreshToken: string;
}

export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "email@domain.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(
        credentials: Record<"email" | "password", string> | undefined,
        req: Pick<RequestInternal, "body" | "query" | "headers" | "method">
      ): Promise<User | null> {
        const { email, password } = credentials as any;
        // const { access_token, refresh_token } = await authLocal({
        //   email,
        //   password,
        // });

        const user = {
          id: "123",
          name: "AnhVV",
          role: "admin",
          accessToken: "access_token",
          refreshToken: "refresh_token",
        };

        if (!!email && !!password) {
          return user;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  callbacks: {
    // Nó được gọi lại khi useSession + getSession + getServerSession

    async jwt({ token, user, account }) {
      return {
        ...user,
        ...token,
      };

      // if (Date.now() < token.accessTokenExpires) {
      //   return token;
      // }

      // const updatedToken = await refreshAccessToken(token);

      // return updatedToken;
    },

    async session({ session, token }) {
      return { ...session, ...token };
    },
  },

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/auth/sign-in",
    error: "/auth/sign-in",
  },
};

const refreshAccessToken = async (token: {
  accessToken: string;
  refreshToken: string;
}) => {
  try {
    const cookie = `Authentication=${token.accessToken}; Refresh=${token.refreshToken}; `;
    const response = await fetch(
      process.env.NEXTAUTH_API_URL + "/auth/refresh",
      { method: "POST", headers: { cookie } }
    );

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    const { accessToken, accessTokenExpirationTime, refreshToken } =
      refreshedTokens.metadata;

    const updatedToken = {
      ...token,
      accessToken,
      accessTokenExpires: Date.now() + accessTokenExpirationTime,
      refreshToken: refreshToken ?? token.refreshToken, // Fall back to old refresh token
    };

    return updatedToken;
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};

export default NextAuth(authOptions);
