import { onMessageListener } from "@/firebase";
import { useGetOrderHistory } from "@/services/PaymentService";
import { formatNumber } from "@/utils/format";
import { FoodColor, FoodStatus } from "@/utils/status";

import {
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
import DatePicker from "react-date-picker";

const getRandomColor = (index: number) => {
  return "#d6d6d7";
};

const getStatusFood = (foodId: string, detail: any) => {
  let data = -1;
  for (const item of detail) {
    if (item.detail.id === foodId) data = item.status;
  }

  return data;
};

const OrderList = () => {
  const [table, setTable] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const { data: orders, refetch } = useGetOrderHistory(table, selectedDate);

  const [hasNoti, setHasNoti] = useState(false);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  useEffect(() => {
    onMessageListener().then(async (data) => {
      refetch();
      setHasNoti(!hasNoti);
    });
  }, [hasNoti]);

  const [toggle, setToggle] = useState(false);

  const getTotalOption = (options: any) => {
    let total = 0;
    for (let item of options) {
      for (let option of item?.data) {
        total = total + option.price;
      }
    }
    return total;
  };

  const getTotal = (listFood: any) => {
    let total = 0;

    for (let item of listFood) {
      if (item.status !== -1 && item.status !== 2)
        total = total + item.detail.price + getTotalOption(item.detail.options);
    }
    return total;
  };

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
          Lịch sử đặt hàng
        </Typography>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <DatePicker
            className="dateCustom"
            onChange={handleDateChange}
            locale="vi-VN"
            value={selectedDate}
          />

          <FormControl sx={{ m: 1, width: 300 }}>
            <InputLabel>Chọn bàn</InputLabel>
            <Select
              value={table}
              onChange={(e: any) => setTable(e.target.value)}
              input={<OutlinedInput label="Name" />}
            >
              <MenuItem value={""}>--------</MenuItem>
              {Array.from(Array(12)).map((_, index) => (
                <MenuItem key={index} value={index + 1}>
                  {`Bàn ${index + 1}`}
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
                            {item.food.name} - {formatNumber(item.price)} -{" "}
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

                          <p
                            style={{
                              color:
                                FoodColor[
                                  getStatusFood(item.food.id, order.details)
                                ] || "red",
                              marginLeft: "12px",
                            }}
                          >
                            {FoodStatus[
                              getStatusFood(item.food.id, order.details)
                            ] || "Đã hủy"}
                          </p>
                        </div>
                      ))}
                    </div>
                  }
                />
                <ListItemSecondaryAction>
                  <Typography variant="body1" sx={{ textAlign: "right" }}>
                    <strong>{formatNumber(getTotal(order.details))}</strong>
                  </Typography>
                  <Typography
                    sx={{ textAlign: "right" }}
                    variant="body2"
                  >{`Thời gian: ${moment(order.createdAt).format(
                    "YYYY-MM-DD HH:mm"
                  )}`}</Typography>
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
