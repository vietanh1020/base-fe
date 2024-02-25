import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import { MenuBook, MenuBookOutlined } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { CreditCard } from "mdi-material-ui";

type ItemLink = {
  title: string;
  path: string;
  icon: JSX.Element;
};

export const AdminSideLink: ItemLink[] = [
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Customers",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Menu",
    path: "/menu",
    icon: (
      <SvgIcon fontSize="small">
        <MenuBookOutlined />
      </SvgIcon>
    ),
  },
  {
    title: "Payment",
    path: "/payment",
    icon: (
      <SvgIcon fontSize="small">
        <CreditCard />
      </SvgIcon>
    ),
  },
];

export const UserSideLink: ItemLink[] = [
  {
    title: "Menu",
    path: "/menu",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Order",
    path: "/order",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Overview",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Account",
    path: "/account",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Settings",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },
];
