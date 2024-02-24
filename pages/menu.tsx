import Food from "@/components/menu/Food";
import CreateFood from "@/components/modals/CreateFood";
import { useGetMenu } from "@/services/OrderService";
import { Box, Grid } from "@mui/material";
import { useState } from "react";

export default function Menu() {
  const [toggle, setToggle] = useState(false);

  const { data } = useGetMenu("8a92cae3-72e6-4958-adb7-26f6d0a01efb");

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <Box mx={3}>
      <h1
        style={{
          textAlign: "center",
        }}
      >
        Đây là menu
        <button onClick={handleClick}> Thêm món +</button>
      </h1>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data?.map((food: any) => {
          return <Food key={food.id} {...food} />;
        })}
      </Grid>

      <CreateFood
        handleClose={handleClick}
        show={toggle}
        food={{}}
      ></CreateFood>
    </Box>
  );
}
