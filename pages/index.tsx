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
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import DatePicker from "react-date-picker";

const Page: MyNextPage = () => {
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);

  const { data: foodDate } = useGetFoodDaily(selectedDate);

  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  const router = useRouter();

  const { data: foodMonth } = useGetFoodMonthly(moment(date).format("YYYY-MM"));
  const { data: turnOver } = useGetTurnover(moment(date).format("YYYY-MM"));

  useEffect(() => {
    const cookie = getCookie("ztoken");

    if (!cookie) router.push("/auth/sign-in");
  }, []);

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <div
        style={{
          margin: "0 120px ",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h2>Thống kê</h2>
        <DatePicker
          className="dateCustom"
          onChange={handleDateChange}
          locale="vi-VN"
          value={selectedDate}
        />
      </div>

      <Container maxWidth="xl">
        <Grid container spacing={3}>
          <Grid xs={12} lg={8}>
            <OverviewSales
              chartSeries={[
                {
                  name: "Số lượng",
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
                  name: "Số lượng",
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
                  name: "Số lượng",
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
                  name: "Tổng tiền:",
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
