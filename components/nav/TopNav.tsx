import { usePopover } from "@/hooks/usePopover";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
// import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import CartIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
import NewspaperIcon from "@heroicons/react/24/solid/NewspaperIcon";

// CartIcon
import {
  Avatar,
  Badge,
  Box,
  IconButton,
  Stack,
  SvgIcon,
  Tooltip,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import PropTypes from "prop-types";
import { AccountPopover } from "./AccountPopover";
import { useSession } from "next-auth/react";
import useLocalStorage from "@/hooks/useLocalStorage";
import { useEffect, useState } from "react";
import CartDialog from "../modals/Cart";
import { useRecoilState } from "recoil";
import { cartState } from "@/store";
import CustomerOrderHistoryDialog from "../modals/CustomerOrderHistory";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = () => {
  const { data: session } = useSession();

  const [cart, setCart] = useRecoilState(cartState);

  const [show, setShow] = useState("");

  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const [showTop, setShowTop] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (!session?.user?.role && location?.href?.includes("restaurant"))
      setShowTop(true);
  }, []);

  const accountPopover = usePopover();

  const handleClose = () => {
    setShow("");
  };

  const hadOrder = getCookie("orderId") || "";
  const listOrder = hadOrder ? hadOrder?.split("+") : [];

  useEffect(() => {
    if (cartItems) setCart(cartItems);
  }, [cartItems]);

  return (
    <>
      <Box
        component="header"
        sx={{
          backdropFilter: "blur(6px)",
          backgroundColor: (theme) =>
            alpha(theme.palette.background.default, 0.8),
          position: "sticky",
          left: {
            lg: `${SIDE_NAV_WIDTH}px`,
          },
          top: 0,
          width: {
            lg: `calc(100% - ${SIDE_NAV_WIDTH}px)`,
          },
          zIndex: (theme) => theme.zIndex.appBar,
        }}
      >
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="space-between"
          spacing={2}
          sx={{
            minHeight: TOP_NAV_HEIGHT,
            px: 2,
          }}
        >
          <Stack alignItems="center" direction="row" spacing={2}></Stack>
          <Stack alignItems="center" direction="row" spacing={2}>
            {showTop && (
              <>
                <Tooltip title="Giỏ hàng">
                  <IconButton onClick={() => setShow("cart")}>
                    <Badge badgeContent={cart?.length || 0} color="error">
                      <SvgIcon fontSize="small">
                        <CartIcon />
                      </SvgIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>

                <Tooltip title="Đã order">
                  <IconButton onClick={() => setShow("history")}>
                    <Badge badgeContent={listOrder?.length || 0} color="error">
                      <SvgIcon fontSize="small">
                        <NewspaperIcon />
                      </SvgIcon>
                    </Badge>
                  </IconButton>
                </Tooltip>
              </>
            )}

            {/* <Tooltip title="Thông báo">
               <IconButton>
                 <Badge badgeContent={4} color="error">
                   <SvgIcon fontSize="small">
                     <BellIcon />
                   </SvgIcon>
                 </Badge>
               </IconButton>
             </Tooltip> */}
            {!showTop && router.pathname !== "/auth/sign-in" && (
              <Avatar
                onClick={accountPopover.handleOpen}
                ref={accountPopover.anchorRef}
                sx={{
                  cursor: "pointer",
                  height: 40,
                  width: 40,
                }}
                src={session?.user.image}
              />
            )}
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

      {show === "cart" && (
        <CartDialog open={show === "cart"} handleClose={handleClose} />
      )}
      {show === "history" && (
        <CustomerOrderHistoryDialog
          open={show === "history"}
          handleClose={handleClose}
        />
      )}
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
