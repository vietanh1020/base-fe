import ChartBarIcon from "@heroicons/react/24/solid/ChartBarIcon";
import CogIcon from "@heroicons/react/24/solid/CogIcon";
import NewspaperIcon from "@heroicons/react/24/solid/NewspaperIcon";
import UserIcon from "@heroicons/react/24/outline/ArchiveBoxIcon";
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
    title: "Thống kê",
    path: "/",
    icon: (
      <SvgIcon fontSize="small">
        <ChartBarIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Đơn hàng",
    path: "/order",
    icon: (
      <SvgIcon fontSize="small">
        <NewspaperIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Thực đơn",
    path: "/menu",
    icon: (
      <SvgIcon fontSize="small">
        <MenuBookOutlined />
      </SvgIcon>
    ),
  },

  {
    title: "Hóa đơn",
    path: "/bill",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Nhân viên",
    path: "/customers",
    icon: (
      <SvgIcon fontSize="small">
        <UsersIcon />
      </SvgIcon>
    ),
  },

  {
    title: "Lịch sử đơn hàng",
    path: "/history",
    icon: (
      <SvgIcon fontSize="small">
        <UserIcon />
      </SvgIcon>
    ),
  },
  {
    title: "Cài đặt",
    path: "/settings",
    icon: (
      <SvgIcon fontSize="small">
        <CogIcon />
      </SvgIcon>
    ),
  },

  // {
  //   title: "Card",
  //   path: "/card",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CreditCard />
  //     </SvgIcon>
  //   ),
  // },

  // {
  //   title: "Payment",
  //   path: "/payment",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <TicketIcon />
  //     </SvgIcon>
  //   ),
  // },

  // {
  //   title: "Cửa hàng",
  //   path: "/company",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <OfficeBuildingCog />
  //     </SvgIcon>
  //   ),
  // },
];

export const UserSideLink: ItemLink[] = [
  // {
  //   title: "Menu",
  //   path: "/menu",
  //   icon: (
  //     <SvgIcon fontSize="small">
  //       <CogIcon />
  //     </SvgIcon>
  //   ),
  // },
];
