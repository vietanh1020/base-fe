import { NextPage } from "next";
import { ReactElement } from "react";
import { AuthType } from ".";

export type MyNextPage = NextPage & {
  layout?: (page: ReactElement) => JSX.Element;
  auth?: AuthType;
  author?: string[];
};
