import Food from "@/components/menu/Food";
import { Box, Grid } from "@mui/material";

export default function ActionAreaCard() {
  return (
    <Box mx={3}>
      <Grid container spacing={{ xs: 2, md: 3 }}>
        <Food />
        <Food />
        <Food />
        <Food />
        <Food />
        <Food />
      </Grid>
    </Box>
  );
}
