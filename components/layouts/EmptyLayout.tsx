import { getCookie } from "cookies-next";
import Head from "next/head";
import { ReactElement } from "react";
import styled from "styled-components";
import { TopNav } from "../nav/TopNav";

const LayoutRoot = styled("div")(() => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const EmptyLayout = (page: ReactElement) => {
  return (
    <>
      <Head>
        <title>Zoder</title>
      </Head>
      <>
        <TopNav onNavOpen={() => {}} />

        <LayoutRoot>
          <LayoutContainer>{page}</LayoutContainer>
        </LayoutRoot>
      </>
    </>
  );
};
