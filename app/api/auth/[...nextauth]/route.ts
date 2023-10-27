import NextAuth from "next-auth";
import KakaoProvider from "next-auth/providers/kakao";
import NaverProvider from "next-auth/providers/naver";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
    // Configure one or more authentication providers
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID ?? "",
            clientSecret: process.env.KAKAO_CLIENT_SECRET ?? "",
        }),
        NaverProvider({
            clientId: process.env.NAVER_CLIENT_ID ?? "",
            clientSecret: process.env.NAVER_CLIENT_SECRET ?? "",
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID ?? "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
        }),
        // ...add more providers here
    ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
