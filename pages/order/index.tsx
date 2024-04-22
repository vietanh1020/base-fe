import DetailOrder from "@/components/modals/DetailOrder";
import { onMessageListener } from "@/firebase";
import { useGetOrder } from "@/services/PaymentService";
import { formatNumber } from "@/utils/format";
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";

const getRandomColor = (index: number) => {
  return "#d6d6d7";
};

const names = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const OrderList = () => {
  const [table, setTable] = useState("");
  const { data: orders, refetch } = useGetOrder(table);

  const [hasNoti, setHasNoti] = useState(false);

  const [order, setOrder] = useState<any>();

  useEffect(() => {
    onMessageListener().then(async (data) => {
      refetch();
      setHasNoti(!hasNoti);
    });
  }, [hasNoti]);

  const [toggle, setToggle] = useState(false);

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <Paper elevation={3} style={{ padding: "20px", margin: "20px" }}>
      <div
        style={{
          display: "flex",
          margin: "0 0 12px 0",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Danh sách order
        </Typography>

        <div>
          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Bàn</InputLabel>
            <Select
              value={table}
              onChange={(e: any) => setTable(e.target.value)}
              input={<OutlinedInput label="Name" />}
            >
              {names?.map((name) => (
                <MenuItem key={name} value={name}>
                  {`Bàn ${name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
      <List>
        <Grid container spacing={2}>
          {orders?.map((order: any, index: number) => (
            <Grid
              item
              xs={12}
              key={order.id}
              style={{
                border: `1px solid ${getRandomColor(index)}`,
                padding: "10px  ",
                borderRadius: "8px",
                margin: "10px 16px",
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
                              {op.data.map((chose: any, index: number) => (
                                <div key={index} style={{ marginLeft: "8px" }}>
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
                    <strong>{formatNumber(order.total)}</strong>
                  </Typography>
                  <Typography
                    sx={{ textAlign: "right" }}
                    variant="body2"
                  >{`Thời gian: ${moment(order.createdAt).format(
                    "HH:mm"
                  )}`}</Typography>

                  <Button
                    onClick={() => {
                      handleClick();
                      setOrder(order);
                    }}
                    color="success"
                    style={{ padding: 0, float: "right" }}
                  >
                    Cập nhật
                  </Button>
                </ListItemSecondaryAction>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>

      <DetailOrder handleClose={handleClick} show={toggle} data={order} />
    </Paper>
  );
};

export default OrderList;
