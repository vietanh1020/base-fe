import Food from "@/components/menu/Food";
import CreateFood from "@/components/modals/CreateFood";
import { useCustomerGetMenu } from "@/services/MenuService";
import { Box, Grid, TextField } from "@mui/material";
import { useState } from "react";

const Menu = ({ id }: any) => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");

  const { data } = useCustomerGetMenu(id, search);

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

      <TextField
        margin="normal"
        value={search}
        sx={{ flex: 1, margin: "0 12px 0 0" }}
        label="Tìm kiếm"
        type="text"
        onChange={(e) => setSearch(e.target.value)}
        autoComplete="off"
      />

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
