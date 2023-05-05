export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/", "/accounts", "/customers", "/settings"],
};
