import "@/styles/globals.css";
import lightThemeOptions from "@/styles/theme/lightThemeOptions";
import createEmotionCache from "@/utils/createEmotionCache";
import { CacheProvider, EmotionCache } from "@emotion/react";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import { ToastContainer } from "react-toastify";
import { RecoilRoot } from "recoil";

interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

const queryClient = new QueryClient();

const clientSideEmotionCache = createEmotionCache();

const lightTheme = createTheme(lightThemeOptions);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  emotionCache = clientSideEmotionCache,
}: MyAppProps) {
  return (
    <SessionProvider session={session}>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <CacheProvider value={emotionCache}>
            <ThemeProvider theme={lightTheme}>
              <CssBaseline />
              <Component {...pageProps} />
              <ToastContainer />
            </ThemeProvider>
          </CacheProvider>
        </RecoilRoot>
      </QueryClientProvider>
    </SessionProvider>
  );
}
