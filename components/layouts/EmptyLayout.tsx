import Head from "next/head";
import { ReactElement } from "react";

export const EmptyLayout = (page: ReactElement) => {
  return (
    <>
      <Head>
        <title>Pharmacy</title>
      </Head>
      <>{page}</>
    </>
  );
};
