import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactElement, useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { SideNav } from "../nav/SideNav";
import { TopNav } from "../nav/TopNav";

const SIDE_NAV_WIDTH = 280;

const LayoutRoot = styled("div")(({ theme }) => ({
  display: "flex",
  flex: "1 1 auto",
  maxWidth: "100%",
  [theme.breakpoints?.up("lg")]: {
    paddingLeft: SIDE_NAV_WIDTH,
  },
}));

const LayoutContainer = styled("div")({
  display: "flex",
  flex: "1 1 auto",
  flexDirection: "column",
  width: "100%",
});

export const AppLayout = (page: ReactElement) => {
  const pathname = usePathname();
  const [openNav, setOpenNav] = useState(false);

  const handlePathnameChange = useCallback(() => {
    if (openNav) {
      setOpenNav(false);
    }
  }, [openNav]);

  useEffect(
    () => {
      handlePathnameChange();
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [pathname]
  );

  return (
    <>
      <Head>
        <title>Lumyri</title>
      </Head>
      <>
        <TopNav onNavOpen={() => setOpenNav(true)} />
        <SideNav onClose={() => setOpenNav(false)} open={openNav} />
        <LayoutRoot>
          <LayoutContainer>{page}</LayoutContainer>
        </LayoutRoot>
      </>
    </>
  );
};
