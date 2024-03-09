import { usePopover } from "@/hooks/usePopover";
import BellIcon from "@heroicons/react/24/solid/BellIcon";
import MagnifyingGlassIcon from "@heroicons/react/24/solid/MagnifyingGlassIcon";
// import UsersIcon from "@heroicons/react/24/solid/UsersIcon";
import CartIcon from "@heroicons/react/24/solid/ShoppingBagIcon";
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

const SIDE_NAV_WIDTH = 280;
const TOP_NAV_HEIGHT = 64;

export const TopNav = () => {
  const { data: session } = useSession();

  const [cart, setCart] = useRecoilState(cartState);

  const [show, setShow] = useState(false);

  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const accountPopover = usePopover();

  const handleCart = () => {
    setShow(!show);
  };

  console.log(cart);

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
            {!session?.user?.role ? (
              <Tooltip title="Giỏ hàng">
                <IconButton onClick={handleCart}>
                  <Badge badgeContent={cart?.length || 0} color="error">
                    <SvgIcon fontSize="small">
                      <CartIcon />
                    </SvgIcon>
                  </Badge>
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip title="Thông báo">
                <IconButton>
                  <Badge badgeContent={4} color="error">
                    <SvgIcon fontSize="small">
                      <BellIcon />
                    </SvgIcon>
                  </Badge>
                </IconButton>
              </Tooltip>
            )}

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
          </Stack>
        </Stack>
      </Box>
      <AccountPopover
        anchorEl={accountPopover.anchorRef.current}
        open={accountPopover.open}
        onClose={accountPopover.handleClose}
      />

      {show && <CartDialog open={show} handleClose={handleCart} />}
    </>
  );
};

TopNav.propTypes = {
  onNavOpen: PropTypes.func,
};
