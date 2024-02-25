import React from "react";
import {
  Typography,
  List,
  ListItem,
  ListItemText,
  Chip,
  Paper,
  Divider,
} from "@mui/material";

const OrderDetail = ({ order }) => {
  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <Typography variant="h5" gutterBottom>
        Order Details - #{order.id}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary={`Customer: ${order.customer}`} />
        </ListItem>
        <ListItem>
          <ListItemText primary={`Table: ${order.tableNumber}`} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary={`Placed at: ${order.placedAt.toLocaleString()}`}
          />
        </ListItem>
        <Divider />
        <ListItem>
          <Typography variant="h6">Items:</Typography>
        </ListItem>
        {order.items.map((item) => (
          <ListItem key={item.id}>
            <ListItemText
              primary={`${item.name} - $${item.price.toFixed(2)}`}
              secondary={
                item.toppings.length > 0 && (
                  <Chip
                    label={`Toppings: ${item.toppings.join(", ")}`}
                    style={{ marginLeft: "10px" }}
                  />
                )
              }
            />
          </ListItem>
        ))}
        <Divider />
        <ListItem>
          <ListItemText primary={`Total: $${order.total.toFixed(2)}`} />
        </ListItem>
      </List>
    </Paper>
  );
};

export default OrderDetail;
