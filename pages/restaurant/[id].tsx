import Food from "@/components/menu/Food";
import CreateFood from "@/components/modals/CreateFood";
import { useCustomerGetMenu } from "@/services/MenuService";
import { Box, Grid } from "@mui/material";
import { useState } from "react";

const Menu = ({ id }: any) => {
  const [toggle, setToggle] = useState(false);

  const { data } = useCustomerGetMenu(id);

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
        Danh sách món ăn
      </h1>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {data?.map((food: any) => {
          return <Food key={food.id} {...food} />;
        })}
      </Grid>

      <CreateFood handleClose={handleClick} show={toggle} food={{}} />
    </Box>
  );
};

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

export default Menu;
