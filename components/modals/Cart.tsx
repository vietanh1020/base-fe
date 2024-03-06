import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemText from "@mui/material/ListItemText";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import useLocalStorage from "@/hooks/useLocalStorage";
import { CardContent, CardMedia, Card, Avatar } from "@mui/material";
import { formatNumber } from "@/utils/format";
import { relative } from "path";
import { useCreateOrder } from "@/services/OrderService";

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

  const { mutateAsync } = useCreateOrder();
  const handleSubmit = async () => {
    const data = {
      companyId: "7e007a62-520d-46bb-8e15-69077cf510cb",
      tableId: "1",
      foods: cartItems,
    };
    const res = await mutateAsync(data);
    if (res) {
      setCartItems([]);
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
                height: 100,
                width: 100,
              }}
            />

            <CardContent sx={{ flex: 1, padding: "0 12px" }}>
              <div
                style={{
                  display: "flex",
                  marginBottom: 4,
                  margin: "0 auto",
                  gap: 1,
                  justifyContent: "space-between",
                }}
              >
                <Typography variant="h6" component="div">
                  {item?.food?.name}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  So Luong: {item.quantity}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                  <strong>Gia:</strong> {formatNumber(item.totalPrice)}d
                </Typography>
              </div>

              <div>
                {item?.options.map((op: any) => (
                  <div
                    style={{ display: "flex", gap: "20px", marginTop: "6px" }}
                  >
                    {op?.data.map((chose: any) => (
                      <div
                        style={{
                          display: "flex",
                          gap: "12px",
                        }}
                      >
                        <Typography variant="h6" component="div">
                          {chose?.label}
                        </Typography>

                        <Typography variant="body2" color="text.secondary">
                          +{formatNumber(chose?.price)}d
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
            Gọi món
          </Button>
        )}
      </div>
    </Dialog>
  );
}
