import { onMessageListener } from "@/firebase";
import { useGetOrder } from "@/services/PaymentService";
import { formatNumber } from "@/utils/format";
import {
  Button,
  Chip,
  Grid,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const OrderList = () => {
  const { data: orders, refetch } = useGetOrder();

  const handleDeleteOrder = (orderId: string) => {
    console.log(`Delete order with id ${orderId}`);
  };

  const handleApproveOrder = (orderId: string) => {};

  const handleRejectOrder = (orderId: string) => {};

  const [hasNoti, setHasNoti] = useState(false);

  useEffect(() => {
    onMessageListener().then(async (data) => {
      refetch();
      setHasNoti(!hasNoti);
    });
  }, [hasNoti]);

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Order List
      </Typography>
      <List>
        <Grid container spacing={2}>
          {orders?.map((order: any) => (
            <Grid
              item
              xs={12}
              key={order.id}
              style={{
                border: `1px solid ${getRandomColor()}`,
                padding: "10px",
                borderRadius: "8px",
                marginBottom: "10px",
              }}
            >
              <ListItem>
                <ListItemText
                  primary={`Bàn ${order.tableId}`}
                  secondary={
                    <div>
                      {order?.foods?.map((item: any) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="subtitle1">
                            <strong style={{ marginRight: "12px" }}>
                              {item.quantity}x
                            </strong>
                            {item.food.name} - {formatNumber(item.price)}đ
                          </Typography>
                          {/* {JSON.stringify(item.food.options)} */}
                          {/* {item?.food.options?.length > 0 &&
                            item.food.options.map((op) => {
                              <>{op}</>;
                            })} */}

                          {item.food.options.map((op: any) => (
                            <>
                              <strong style={{ marginLeft: "8px" }}>
                                {op.label}:
                              </strong>
                              {op.data.map((chose: any) => (
                                <div style={{ marginLeft: "8px" }}>
                                  {chose.label}
                                </div>
                              ))}
                            </>
                          ))}
                        </div>
                      ))}
                    </div>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography variant="body1" sx={{ textAlign: "right" }}>
                    Giá {formatNumber(order.total)}đ
                  </Typography>
                  <Typography
                    sx={{ textAlign: "right" }}
                    variant="body2"
                  >{`Thời gian: ${moment(order.createdAt).format(
                    "HH:mm"
                  )}`}</Typography>

                  <Button
                    onClick={() => handleApproveOrder(order.id)}
                    color="success"
                    style={{ marginLeft: "10px" }}
                  >
                    Đồng ý
                  </Button>
                  <Button
                    onClick={() => handleRejectOrder(order.id)}
                    color="error"
                    style={{ marginLeft: "10px" }}
                  >
                    Từ chối
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
    </Paper>
  );
};

export default OrderList;
