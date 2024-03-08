import { AppLayout } from "@/components/layouts/AppLayout";
import "@/styles/globals.css";
import { createTheme } from "@/theme";
import { MyNextPage } from "@/types";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { getMessagingToken, onMessageListener } from "@/firebase";

interface MyAppProps extends AppProps {
  Component: MyNextPage;
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
    },
  },
});

const clientSideEmotionCache = createEmotionCache();

const theme = createTheme();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  const { layout = AppLayout, author = [] } = Component;

  useEffect(() => {
    getMessagingToken();
  }, []);
  useEffect(() => {
    onMessageListener().then((data) => {
      console.log("Receive foreground: ", data);
    });
  }, []);

  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              {layout(<Component {...pageProps} />)}
              <ToastContainer theme="light" />
            </ThemeProvider>
          </CacheProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
}
