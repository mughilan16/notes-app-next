import { type AppType } from "next/app";
import { api } from "@/utils/api";
import "@/styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Head from "next/head";


const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ClerkProvider>
      <Head>
        <title>Quick Note</title>
        <link
          rel="icon"
          href="assignment.png"
          type="image/x-icon"
          sizes="32x32"
        />
      </Head>
      <Component {...pageProps} />
    </ClerkProvider>
  );
};

export default api.withTRPC(MyApp);
