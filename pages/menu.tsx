import Food from "@/components/menu/Food";
import CreateFood from "@/components/modals/CreateFood";
import { useAdminGetMenu } from "@/services/MenuService";
import { Box, Button, Grid } from "@mui/material";
import { useState } from "react";

export default function Menu() {
  const [toggle, setToggle] = useState(false);

  const { data } = useAdminGetMenu();

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <Box mx={3}>
      <h1
        style={{
          textAlign: "center",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        Menu
        <Button
          sx={{
            border: "1px solid #F95E07",
            color: "#F95E07",
            fontSize: "14px",
            fontWeight: "500",
            borderRadius: "8px",
          }}
          onClick={handleClick}
        >
          Thêm món +
        </Button>
      </h1>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data?.map((food: any) => {
          return <Food key={food.id} {...food} />;
        })}
      </Grid>

      <CreateFood handleClose={handleClick} show={toggle} food={{}} />
    </Box>
  );
}
