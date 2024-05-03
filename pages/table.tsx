import * as React from "react";
import { experimentalStyled as styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useGetTableStatus } from "@/services/CompanyService";
import { useRouter } from "next/router";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  border: "4px solid #ccc",
  padding: "50px",
  textAlign: "center",
  fontSize: "20px",
  fontWeight: 600,
  color: theme.palette.text.secondary,
}));

export default function ResponsiveGrid() {
  const { data } = useGetTableStatus();
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1, margin: "0 150px" }}>
      <Grid
        container
        spacing={{ xs: 2, md: 3, lg: 4 }}
        columns={{ xs: 4, sm: 8, md: 12, lg: 4 }}
      >
        {Array.from(Array(10)).map((_, index) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <Item
              sx={{ background: data?.includes(index + 1) ? "#ccc" : "#fff" }}
              onClick={() => router.push(`/order?table=${index + 1}`)}
            >
              <div style={{ height: "100px" }}>Bàn {index + 1}</div>
              {/* {data?.includes(index + 1) ? <div>Đang phục vụ</div> : ""} */}
            </Item>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
