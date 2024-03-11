import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import { Chart } from "./Chart";

const useChartOptions = (labels: any) => {
  const theme = useTheme();

  return {
    chart: {
      background: "transparent",
    },
    colors: [
      theme.palette.primary.main,
      theme.palette.success.main,
      theme.palette.warning.main,
    ],
    dataLabels: {
      enabled: false,
    },
    labels,
    legend: {
      show: false,
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
      },
    },
    states: {
      active: {
        filter: {
          type: "none",
        },
      },
      hover: {
        filter: {
          type: "none",
        },
      },
    },
    stroke: {
      width: 0,
    },
    theme: {
      mode: theme.palette.mode,
    },
    tooltip: {
      fillSeriesColor: false,
    },
  };
};

export const OverviewTraffic = (props: any) => {
  const { chartSeries, labels, sx } = props;
  const [sum, setSum] = useState(0);

  useEffect(() => {
    const sumChart = chartSeries.reduce(
      (total: number, item: number) => total + item,
      0
    );
    setSum(sumChart);
  }, [chartSeries]);

  const chartOptions = useChartOptions(labels);

  return (
    <Card sx={sx}>
      <CardHeader title="% Doanh số" />
      <CardContent>
        <Chart
          height={300}
          options={chartOptions}
          series={chartSeries}
          type="donut"
          width="100%"
        />
        <Stack
          alignItems="center"
          direction="row"
          justifyContent="center"
          spacing={2}
          sx={{ mt: 2 }}
        >
          {chartSeries.map((item: any, index: number) => {
            const label = labels[index];

            return (
              <Box
                key={label}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Typography sx={{ my: 1 }} variant="h6">
                  {label}
                </Typography>
                <Typography color="text.secondary" variant="subtitle2">
                  {((item / sum || 0) * 100)?.toFixed(2)}%
                </Typography>
              </Box>
            );
          })}
        </Stack>
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
