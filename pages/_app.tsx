import { AppLayout } from "@/components/layouts/AppLayout";
import { getMessagingToken } from "@/firebase";
import { createTheme } from "@/theme";
import { MyNextPage } from "@/types";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-calendar/dist/Calendar.css";
import "@/styles/globals.css";
import "react-date-picker/dist/DatePicker.css";
import { RecoilRoot } from "recoil";

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
