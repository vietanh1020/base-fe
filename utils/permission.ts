export const adminPages = ["/", "/customers", "/account", "/settings", "/menu"];

export const userPages = ["/", "/account", "/settings", "/menu"];

export const publicPages = [
  "/auth/sign-in",
  "/auth/sign-up",
  "/about",
  "/503",
  "/menu",
];

export const allPages = [
  "/",
  "/customers",
  "/account",
  "/settings",
  ...publicPages,
];
