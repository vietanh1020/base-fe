import { useGetOrder } from "@/services/PaymentService";
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
import { useRouter } from "next/router";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const OrderList = () => {
  const { data: orders } = useGetOrder();

  const handleDeleteOrder = (orderId: string) => {
    // Add your logic to handle order deletion
    console.log(`Delete order with id ${orderId}`);
  };

  const handleApproveOrder = (orderId: string) => {
    // Add your logic to handle order approval
    console.log(`Approve order with id ${orderId}`);
  };

  const handleRejectOrder = (orderId: string) => {
    // Add your logic to handle order rejection
    console.log(`Reject order with id ${orderId}`);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Order List
      </Typography>
      <List>
        <Grid container spacing={2}>
          {orders?.map((order) => (
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
                  primary={`${order?.customer} - Bàn ${order.tableId}`}
                  secondary={
                    <div>
                      {order?.foods?[0]?.food.map((item) => (
                        <div
                          key={item.id}
                          style={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Typography variant="subtitle1">
                            {item.name} - ${item.price.toFixed(2)}
                          </Typography>
                          {item.toppings.length > 0 && (
                            <Chip
                              label={`Toppings: ${item.toppings.join(", ")}`}
                              style={{
                                marginLeft: "10px",
                                marginBottom: "5px",
                              }}
                            />
                          )}
                        </div>
                      ))}
                    </div>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography variant="body1">
                    ${order.total.toFixed(2)}
                  </Typography>
                  <Typography variant="body2">{`Thời gian: ${order.createdAt.toLocaleString()}`}</Typography>

                  <Button
                    onClick={() => handleApproveOrder(order.id)}
                    variant="contained"
                    color="primary"
                    style={{ marginLeft: "10px" }}
                  >
                    Approve
                  </Button>
                  <Button
                    onClick={() => handleRejectOrder(order.id)}
                    variant="contained"
                    color="secondary"
                    style={{ marginLeft: "10px" }}
                  >
                    Reject
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
