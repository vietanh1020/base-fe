import { onMessageListener } from "@/firebase";
import { useCancelFoodOrder, useCustomerGetOrder } from "@/services";
import { formatNumber } from "@/utils/format";
import { FoodColor, FoodStatus } from "@/utils/status";
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
import { getCookie } from "cookies-next";
import * as React from "react";
import { toast } from "react-toastify";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function CustomerOrderHistoryDialog({ open, handleClose }: any) {
  const orderId = getCookie("orderId") || "";

  const { data: cartItems, refetch } = useCustomerGetOrder(orderId);

  const { mutateAsync } = useCancelFoodOrder();

  const [hasNoti, setHasNoti] = React.useState(false);

  const getTotal = (options: any) => {
    let total = 0;
    for (let item of options) {
      for (let option of item?.data) {
        total = total + option.price;
      }
    }
    return total;
  };

  React.useEffect(() => {
    onMessageListener().then(async (data) => {
      toast.success("Cửa hành đã cập nhật trạng thái đơn hàng của bạn");
      refetch();
      setHasNoti(!hasNoti);
    });
  }, [hasNoti]);

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
            Đơn hàng đã order
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
        {cartItems?.map((order: any, index: number) => (
          <>
            <Card
              key={index}
              sx={{
                display: "flex",
                alignItems: "center",
                padding: 0,
                margin: "4px 12px",
              }}
            >
              <img
                src={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${order?.detail?.image}`}
                style={{
                  height: 100,
                  width: 100,
                }}
                alt="Order"
              />

              <CardContent sx={{ flex: 1 }}>
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
                    {order?.detail?.name}
                  </Typography>
                </div>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <Typography variant="body2" color="text.secondary">
                    So Luong: <strong>1</strong>
                  </Typography>
                  <Typography variant="body2">
                    Giá:{" "}
                    <strong>
                      {formatNumber(
                        order.detail.price + getTotal(order.detail.options)
                      )}
                    </strong>
                  </Typography>
                </div>
                <div>
                  {order?.detail?.options.map((op: any, index: number) => (
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

                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <div
                    autoFocus
                    style={{
                      fontWeight: "500",
                      color: FoodColor[order?.status] || "red",
                    }}
                  >
                    {FoodStatus[order?.status]}
                    {order?.status == -1 && "Đã hủy"}
                  </div>

                  <div>
                    {order?.status === 0 && (
                      <Button
                        color="error"
                        onClick={() => mutateAsync(order.id)}
                      >
                        Hủy
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </>
        ))}
      </List>

      <div
        style={{
          position: "fixed",
          bottom: 0,
          right: 0,
          width: "100%",
          textAlign: "center",
        }}
      >
        {/* {cartItems.length > 0 && (
          <Button
            sx={{
              background: " #F95E07",
              fontSize: "14px",
              color: "white",
              fontWeight: "500",
              borderRadius: "8px",
              marginBottom: "12px",
            }}
          >
            Tổng - {formatNumber(totalPrice)}đ
          </Button>
        )} */}
      </div>
    </Dialog>
  );
}
