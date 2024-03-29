import { Box, Container, Unstable_Grid2 as Grid } from "@mui/material";
import { subDays, subHours } from "date-fns";

import { OverviewBudget } from "@/components/overview/Budget";
import { OverviewLatestOrders } from "@/components/overview/LatestOrders";
import { OverviewLatestProducts } from "@/components/overview/LatestProducts";
import { OverviewSales } from "@/components/overview/Sales";
import { OverviewTasksProgress } from "@/components/overview/TasksProgress";
import { OverviewTotalCustomers } from "@/components/overview/TotalCustomers";
import { OverviewTotalProfit } from "@/components/overview/TotalProfit";
import { OverviewTraffic } from "@/components/overview/Traffic";
import { MyNextPage } from "@/types";
import { useGetFoodDaily, useGetFoodMonthly, useGetTurnover } from "@/services";
import { useState } from "react";
import moment from "moment";
import { SalesMonthly } from "@/components/overview/SalesMonthly";

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
      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewBudget
              difference={12}
              positive
              sx={{ height: "100%" }}
              value="$24k"
            />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalCustomers
              difference={16}
              positive={false}
              sx={{ height: "100%" }}
              value="1.6k"
            />
          </Grid>

          <Grid xs={12} sm={6} lg={3}>
            <OverviewTasksProgress sx={{ height: "100%" }} value={75.5} />
          </Grid>
          <Grid xs={12} sm={6} lg={3}>
            <OverviewTotalProfit sx={{ height: "100%" }} value="$15k" />
          </Grid>

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
                  data: turnOver?.map((item) => item.count) || [],
                },
              ]}
              labels={turnOver?.map((item) => item.date) || []}
              sx={{ height: "100%" }}
            />
          </Grid>

          <Grid xs={12}>
            <SalesMonthly
              title="Thống kê doanh số trong tháng"
              chartSeries={[
                {
                  name: "This month",
                  data: turnOver?.map((item) => item.sum) || [],
                },
              ]}
              labels={turnOver?.map((item) => item.date) || []}
              sx={{ height: "100%" }}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Page;
