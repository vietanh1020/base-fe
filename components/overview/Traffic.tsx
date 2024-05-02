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
      "#FF0000",
      "#00FF00",
      "#0000FF",
      "#FFFF00",
      "#FF00FF",
      "#00FFFF",
      "#800000",
      "#008000",
      "#000080",
      "#808000",
      "#800080",
      "#008080",
      "#C0C0C0",
      "#808080",
      "#FFA500",
      "#FFC0CB",
      "#800000",
      "#800080",
      "#808000",
      "#808080",
      "#C0C0C0",
      "#FFA500",
      "#FFC0CB",
      "#800000",
      "#800080",
      "#808000",
      "#808080",
      "#C0C0C0",
      "#FFA500",
      "#FFC0CB",
    ],
    dataLabels: {
      // enabled: false,
    },
    labels,
    legend: {
      // show: false,
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
      </CardContent>
    </Card>
  );
};

OverviewTraffic.propTypes = {
  chartSeries: PropTypes.array.isRequired,
  labels: PropTypes.array.isRequired,
  sx: PropTypes.object,
};
