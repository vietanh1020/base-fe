import {
  Box,
  Container,
  Unstable_Grid2 as Grid,
  Typography,
} from "@mui/material";

import { OverviewSales } from "@/components/overview/Sales";
import { SalesMonthly } from "@/components/overview/SalesMonthly";
import { OverviewTraffic } from "@/components/overview/Traffic";
import { useGetFoodDaily, useGetFoodMonthly, useGetTurnover } from "@/services";
import { MyNextPage } from "@/types";
import moment from "moment";
import { useState } from "react";

const now = new Date();

const Page: MyNextPage = () => {
  const [date, setDate] = useState(new Date());
  const { data: foodDate } = useGetFoodDaily(moment(date).format("YYYY-MM-DD"));

  const { data: foodMonth } = useGetFoodMonthly(moment(date).format("YYYY-MM"));
  const { data: turnOver } = useGetTurnover(moment(date).format("YYYY-MM"));

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Typography variant="h5" sx={{ marginLeft: "80px" }} gutterBottom>
        Thống kê
      </Typography>
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} lg={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: "This year",
                  data: foodDate?.map((item) => item.count) || [],
                },
              ]}
              labels={foodDate?.map((item) => item.name) || []}
              sx={{ height: "100%" }}
            />
          </Grid>
          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={foodDate?.map((item) => item.count) || []}
              labels={foodDate?.map((item) => item.name) || []}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12} lg={8}>
            <SalesMonthly
              title="Sản phẩm bán ra trong tháng"
              chartSeries={[
                {
                  name: "This year",
                  data: foodMonth?.map((item) => item.count) || [],
                },
              ]}
              labels={foodMonth?.map((item) => item.name) || []}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12} md={6} lg={4}>
            <OverviewTraffic
              chartSeries={foodMonth?.map((item) => item.count) || []}
              labels={foodMonth?.map((item) => item.name) || []}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12}>
            <SalesMonthly
              title="Số lượng đơn hàng trong tháng"
              chartSeries={[
                {
                  name: "This month",
                  data: turnOver?.map((item: any) => item.count) || [],
                },
              ]}
              labels={turnOver?.map((item: any) => item.date) || []}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12}>
            <SalesMonthly
              title="Thống kê doanh số trong tháng"
              chartSeries={[
                {
                  name: "This month",
                  data: turnOver?.map((item: any) => item.sum) || [],
                },
              ]}
              labels={turnOver?.map((item: any) => item.date) || []}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;
