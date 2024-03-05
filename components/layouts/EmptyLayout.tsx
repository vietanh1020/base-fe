import Head from "next/head";
import { ReactElement } from "react";

export const EmptyLayout = (page: ReactElement) => {
  return (
    <>
      <Head>
        <title>Zorder</title>
      </Head>
      <>{page}</>
    </>
  );
};
