import Head from "next/head";
import { ReactElement } from "react";
import styled from "styled-components";
import { SideNav } from "../nav/SideNav";
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

export const AppLayout = (page: ReactElement) => {
  return (
    <>
      <Head>
        <title>Lumyri</title>
      </Head>
      <>
        <TopNav onNavOpen={() => {}} />

        <SideNav onClose={() => {}} open={true} />
        <LayoutRoot style={{ paddingLeft: "280px" }}>
          <LayoutContainer>{page}</LayoutContainer>
        </LayoutRoot>
      </>
    </>
  );
};
