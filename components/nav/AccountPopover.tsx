import { authLogout } from "@/services";
import {
  Box,
  Divider,
  MenuItem,
  MenuList,
  Popover,
  Typography,
} from "@mui/material";
import { deleteCookie, setCookie } from "cookies-next";
import { signOut, useSession } from "next-auth/react";
import PropTypes from "prop-types";
import { useEffect } from "react";

export const AccountPopover = (props: any) => {
  const { anchorEl, onClose, open } = props;

  const { data: session } = useSession() as any;

  useEffect(() => {
    if (session?.accessToken) setCookie("ztoken", session?.accessToken);
  }, [session?.accessToken]);

  const handleSignOut = async () => {
    await authLogout().then(() => {
      deleteCookie("ztoken");
      deleteCookie("device_token");
      signOut({ callbackUrl: "/auth/sign-in" });
      localStorage.clear();
    });
  };

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">Tài khoản</Typography>
        <Typography color="text.secondary" variant="body2">
          {session?.user.name}
        </Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem onClick={handleSignOut}>Đăng xuất</MenuItem>
      </MenuList>
    </Popover>
  );
};

AccountPopover.propTypes = {
  anchorEl: PropTypes.any,
  onClose: PropTypes.func,
  open: PropTypes.bool.isRequired,
};
