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

const orders = [
  {
    id: 1,
    customer: "John Doe",
    items: [
      { id: 101, name: "Burger", price: 10.0, toppings: ["Cheese", "Lettuce"] },
      { id: 102, name: "Fries", price: 5.0, toppings: [] },
    ],
    total: 15.0,
    placedAt: new Date("2024-02-28T12:30:00"),
    tableNumber: 1,
  },
  {
    id: 2,
    customer: "Jane Smith",
    items: [
      {
        id: 201,
        name: "Pizza",
        price: 20.0,
        toppings: ["Pepperoni", "Mushrooms"],
      },
      {
        id: 202,
        name: "Salad",
        price: 15.0,
        toppings: ["Tomatoes", "Cucumbers"],
      },
    ],
    total: 35.0,
    placedAt: new Date("2024-02-28T13:45:00"),
    tableNumber: 2,
  },
  // Add more orders as needed
];

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const OrderList = () => {
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
          {orders.map((order) => (
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
                  primary={`${order.customer} - Bàn ${order.tableNumber}`}
                  secondary={
                    <div>
                      {order.items.map((item) => (
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
                  <Typography variant="body2">{`Thời gian: ${order.placedAt.toLocaleString()}`}</Typography>

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
