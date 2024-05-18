import { onMessageListener } from "@/firebase";
import { useGetTableStatus } from "@/services/CompanyService";
import { useGetTableOrder } from "@/services/PaymentService";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { experimentalStyled as styled } from "@mui/material/styles";
import moment from "moment";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  border: "4px solid #ccc",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const [hasNoti, setHasNoti] = useState(false);

  const { data, refetch: refetchTable } = useGetTableStatus();
  const { data: orders, refetch: refetchOrder } = useGetTableOrder("");

  useEffect(() => {
    onMessageListener().then(async (data) => {
      refetchOrder();
      refetchTable();
      setHasNoti(!hasNoti);
    });
  }, [hasNoti]);

  const router = useRouter();

  const getMinTime = (foods: any) => {
    if (foods) {
      const dates = foods.map((item: any) => new Date(item.createdAt));
      const minDate = new Date(Math.min(...dates));
      return moment(minDate).format("HH:mm");
    }

    return "";
  };

  return (
    <div>
      <Box sx={{ flexGrow: 1, margin: "0 150px" }}>
        <h1>Danh sách bàn ăn</h1>
        <Grid
          container
          spacing={{ xs: 2, md: 3, lg: 4 }}
          columns={{ xs: 4, sm: 8, md: 12, lg: 16 }}
        >
          {Array.from(Array(12)).map((_, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Item
                sx={{
                  background:
                    data && data?.includes(index + 1) ? "#ccc" : "#fff",
                }}
                onClick={() => router.push(`/order?table=${index + 1}`)}
              >
                <div style={{ height: "100px" }}>
                  Bàn {index + 1}
                  {orders?.[index + 1] && (
                    <div>Số món: {orders?.[index + 1]?.length}</div>
                  )}
                  {orders?.[index + 1] && (
                    <div>Thời gian: {getMinTime(orders?.[index + 1])}</div>
                  )}
                </div>
              </Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
}
