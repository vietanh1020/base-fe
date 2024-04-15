import Food from "@/components/menu/Food";
import CreateFood from "@/components/modals/CreateFood";
import { useAdminGetMenu, useGetCategory } from "@/services/MenuService";
import { Box, Button, Grid, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useState } from "react";

export default function Menu() {
  const [toggle, setToggle] = useState(false);

  const [keySearch, setKeySearch] = useState("");
  const [search, setSearch] = useState("");

  const debounceSearch = debounce((value) => setSearch(value), 600);

  const handleChangeSearch = (value: string) => {
    setKeySearch(value);
    // debounceSearch(value);
  };

  const { data } = useAdminGetMenu(search);
  const { data: category } = useGetCategory();

  const handleClick = () => {
    setToggle(!toggle);
  };

  const searchCate = (id: string) => {
    if (category) {
      const cate = category?.find((cate: any) => cate.id === id);
      if (cate) {
        return cate?.name;
      }
    }
    return "";
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
        <div>
          <TextField
            margin="normal"
            value={keySearch}
            sx={{ flex: 1, margin: "0 12px 0 0" }}
            label="Tìm kiếm"
            type="text"
            onChange={(e) => handleChangeSearch(e.target.value)}
            autoComplete="off"
          />

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
        </div>
      </h1>

      <div>
        {data &&
          Object?.keys(data)?.map((category: any) => (
            <>
              <h2>{searchCate(category)}</h2>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {data?.[category]?.map((food: any) => {
                  return <Food key={food.id} {...food} />;
                })}
              </Grid>
            </>
          ))}
      </div>

      <CreateFood
        handleClose={handleClick}
        show={toggle}
        food={{}}
        category={category}
      />
    </Box>
  );
}
