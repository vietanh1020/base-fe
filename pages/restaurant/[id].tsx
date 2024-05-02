import { EmptyLayout } from "@/components/layouts/EmptyLayout";
import FoodCustomer from "@/components/menu/FoodCustomer";
import CreateFood from "@/components/modals/CreateFood";
import UserInformation from "@/components/modals/UserInformation";
import { useUserGetCompany } from "@/services/CompanyService";
import { useCustomerGetMenu, useUserGetCategory } from "@/services/MenuService";
import ClockIcon from "@heroicons/react/24/solid/ClockIcon";
import MapPinIcon from "@heroicons/react/24/solid/MapPinIcon";
import { Box, Divider, Grid } from "@mui/material";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

const Menu = ({ id }: any) => {
  const [toggle, setToggle] = useState(false);
  const [search, setSearch] = useState("");

  const { data: company } = useUserGetCompany(id);
  const { data: listCategory } = useUserGetCategory(id);
  const [toggleName, setToggleName] = useState(false);

  const { data } = useCustomerGetMenu(id, search);

  useEffect(() => {
    const userName = getCookie("customerName");

    if (!userName) {
      setToggleName(true);
    }
  }, []);

  const searchCate = (id: string) => {
    if (listCategory) {
      const cate = listCategory?.find((cate: any) => cate.id === id);
      if (cate) {
        return cate?.name;
      }
    }
    return "";
  };

  const handleClick = () => {
    setToggle(!toggle);
  };

  return (
    <Box mx={3}>
      <Box
        component="img"
        alt="Under development"
        src="https://images.foody.vn/res/g117/1168187/prof/s640x400/foody-upload-api-foody-mobile-fo-a72ffcba-230418142410.jpeg"
        style={{ objectFit: "cover", width: "100%" }}
      />
      <div
        style={{
          width: "260px",
          margin: "12px",
        }}
      >
        <div style={{ display: "flex" }}>
          <div
            style={{
              fontSize: "24px",
              fontWeight: "600",
            }}
          >
            {company?.name}
          </div>
        </div>
        {/* <div style={{ display: "flex" }}>
          <div style={{ width: "20px", marginRight: "12px" }}>
            <StoreIcon />
          </div>
          <div>{company?.description}</div>
        </div> */}
        <div style={{ display: "flex" }}>
          <div style={{ width: "20px", marginRight: "12px" }}>
            <ClockIcon />
          </div>
          <div>
            Mở cửa: {company?.openAt} - Đóng cửa: {company?.closeAt}
          </div>
        </div>
        <div style={{ display: "flex" }}>
          <div style={{ width: "20px", marginRight: "12px" }}>
            <MapPinIcon />
          </div>
          <div>{company?.address}</div>
        </div>
      </div>
      <Divider />
      <Divider />
      <Divider />
      <div>
        {data &&
          Object?.keys(data)?.map((category: any) => (
            <>
              <Box
                sx={{
                  fontSize: "22px",
                  fontWeight: "600",
                  margin: "24px 0 12px 0",
                }}
              >
                {searchCate(category)}
              </Box>
              <Grid container spacing={{ xs: 2, md: 3 }}>
                {data?.[category]?.map((food: any) => {
                  return (
                    <FoodCustomer
                      key={food.id}
                      {...food}
                      listCategory={listCategory}
                    />
                  );
                })}
              </Grid>
            </>
          ))}
      </div>
      <CreateFood handleClose={handleClick} show={toggle} food={{}} />
      <UserInformation
        handleClose={() => setToggleName(false)}
        show={toggleName}
        food={{}}
      />
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

Menu.layout = EmptyLayout;

export default Menu;
