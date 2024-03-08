import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import NewspaperIcon from "@heroicons/react/24/solid/NewspaperIcon";
import UserIcon from "@heroicons/react/24/solid/UserIcon";
import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import TicketIcon from "@heroicons/react/24/solid/TicketIcon";
import { MenuBook, MenuBookOutlined } from "@mui/icons-material";
import { SvgIcon } from "@mui/material";
import { CreditCard, OfficeBuildingCog } from "mdi-material-ui";

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
    title: "Order",
    path: "/order",
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
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
    title: "Card",
    path: "/card",
    icon: (
      <SvgIcon fontSize="small">
        <CreditCard />
      </SvgIcon>
    ),
  },

  {
    title: "Payment",
    path: "/payment",
    icon: (
      <SvgIcon fontSize="small">
        <TicketIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Company",
    path: "/company",
    icon: (
      <SvgIcon fontSize="small">
        <OfficeBuildingCog />
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
