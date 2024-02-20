import Food from "@/components/menu/Food";
import { useGetMenu } from "@/services/OrderService";
import { Box, Grid } from "@mui/material";

export default function ActionAreaCard() {
  const { data } = useGetMenu("e6806cc5-1541-4d30-a18a-cb04dd884b7f");

  console.log(data);

  return (
    <Box mx={3}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data?.map((food: any) => {
          return <Food key={food.id} {...food} />;
        })}
      </Grid>
    </Box>
  );
}
