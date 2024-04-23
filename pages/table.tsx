import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  border: "5px solid #ccc",
  padding: "50px",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  return (
    <Box sx={{ flexGrow: 1, margin: "0 150px" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ lg: 8, xs: 4, sm: 8, md: 12 }}
      >
        {Array.from(Array(10)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item>Bàn {index + 1}</Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
