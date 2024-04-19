import useLocalStorage from "@/hooks/useLocalStorage";
import { useCreateOrder } from "@/services/OrderService";
import { cartState } from "@/store";
import { formatNumber } from "@/utils/format";
import CloseIcon from "@mui/icons-material/Close";
import { Card, CardContent } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Slide from "@mui/material/Slide";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { TransitionProps } from "@mui/material/transitions";
import { getCookie, setCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import * as React from "react";
import { toast } from "react-toastify";
import { useRecoilState } from "recoil";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CartDialog({ open, handleClose }: any) {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);
  const [cart, setCart] = useRecoilState(cartState);

  const router = useRouter();
  const { mutateAsync } = useCreateOrder();

  const totalPrice = cartItems.reduce(
    (total: number, item: any) => total + item.totalPrice * item.quantity,
    0
  );

  const handleSubmit = async () => {
    const { id, table } = router.query;

    const deviceToken = getCookie("device_token");

    const data = {
      customerName: "AnhVV",
      companyId: id,
      tableId: table,
      foods: cartItems,
      deviceToken,
    };
    const res = await mutateAsync(data);
    if (res?.id) {
      setCartItems([]);
      setCart([]);

      const orderId = getCookie("orderId");

      const options = {
        maxAge: 6 * 60 * 60,
      };

      if (orderId) {
        setCookie("orderId", orderId + `+${res?.id}`, options);
      } else {
        setCookie("orderId", res?.id, options);
      }

      toast.success("Order Thành Công");
      handleClose();
    }
  };

  return (
    <Dialog
      fullScreen
      open={open}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar sx={{ position: "relative" }}>
        <Toolbar>
          <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
            Giỏ hàng
          </Typography>

          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <List>
        {cartItems?.map((item: any, key: any) => (
          <Card
            key={key}
            sx={{
              display: "flex",
              alignItems: "center",
              padding: 0,
              margin: "4px 12px",
            }}
          >
            <img
              src={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${item?.food?.image}`}
              style={{
                marginLeft: 12,
                width: 80,
              }}
              alt=""
            />

            <CardContent sx={{ flex: 1, padding: "0 12px", mt: 3 }}>
              <Typography variant="h6" component="div">
                {item?.food?.name}
              </Typography>

              <div
                style={{
                  display: "flex",
                  marginBottom: 4,
                  margin: "0 auto",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  So Luong: {item.quantity}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <strong>Gia:</strong> {formatNumber(item.totalPrice)}
                </Typography>
              </div>

              <div>
                {item?.options.map((op: any, index: number) => (
                  <div
                    key={index}
                    style={{ display: "flex", gap: "20px", marginTop: "6px" }}
                  >
                    {op?.data.map((chose: any, index: number) => (
                      <div
                        key={index}
                        style={{
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <Typography variant="h6" component="div">
                          {chose?.label}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          +{formatNumber(chose?.price)}
                        </Typography>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              {/* <Button autoFocus color="error" onClick={handleClose}>
                Xóa
              </Button> */}
            </CardContent>
          </Card>
        ))}
      </List>
      {cartItems.length === 0 && (
        <div style={{ display: "flex", margin: "auto" }}>(Giỏ hàng rỗng)</div>
      )}

      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        {cartItems.length > 0 && (
          <Button
            sx={{
              background: " #F95E07",
              fontSize: "14px",
              color: "white",
              fontWeight: "500",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
            onClick={handleSubmit}
          >
            Gọi món - {formatNumber(totalPrice)}
          </Button>
        )}
      </div>
    </Dialog>
  );
}
