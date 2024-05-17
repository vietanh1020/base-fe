import { useDeleteFood } from "@/services/MenuService";
import { formatNumber } from "@/utils/format";
import { Box, Button, CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreateOrder from "../modals/CreateOrder";
import UpdateFood from "../modals/UpdateFood";
import TagIcon from "@heroicons/react/24/outline/TagIcon";

export default function FoodShop(food: any) {
  const [show, setShow] = useState("");
  const [currentFood, setCurrentFood] = useState<any>();
  const { mutateAsync: deleteFood } = useDeleteFood();
  const { price, priceOrigin, name, image, description, listCategory } = food;
  const { data: session } = useSession();

  const handleShow = () => {
    setShow("createOrder");
  };
  const handleClose = () => {
    setShow("");
  };

  const handleFood = (food: any) => {
    setShow("updateFood");
    setCurrentFood(food);
  };

  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ border: "none", position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder${image}`}
            alt="green iguana"
            sx={{ objectFit: "contain" }}
          />
          <CardContent
            sx={{
              mb: 2,
              py: 1,
              px: 1,
            }}
          >
            <div
              style={{
                // display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  py: 0,
                  fontWeight: 700,
                  fontSize: "16px",
                }}
                variant="body2"
                pb={1}
              >
                {name}
              </Typography>

              <Box
                sx={{
                  display: "flex",
                }}
              >
                <Typography
                  gutterBottom
                  variant="body2"
                  component="h4"
                  sx={{
                    py: 0,
                    fontSize: "16px",

                    fontWeight: 600,
                  }}
                >
                  {formatNumber(price)}
                </Typography>

                {priceOrigin !== price && (
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="h4"
                      sx={{
                        py: 0,
                        lineHeight: "26px",
                        marginLeft: "10px",
                        textDecoration: "line-through",
                      }}
                    >
                      {formatNumber(priceOrigin)}
                    </Typography>
                    <div
                      style={{
                        width: "16px",
                        position: "relative",
                        bottom: "2px",
                        left: "2px",
                      }}
                    >
                      <svg
                        fill="orange"
                        width="14px"
                        height="14px"
                        viewBox="0 0 256 256"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M237.1709,129.69141,132.71875,25.23926A11.96309,11.96309,0,0,0,121.88086,21.957L41.22559,38.08789a3.99747,3.99747,0,0,0-3.1377,3.1377L21.957,121.88086a11.97405,11.97405,0,0,0,3.28223,10.83789L129.69043,237.1709a11.998,11.998,0,0,0,16.9707,0l90.50977-90.50879a11.998,11.998,0,0,0,0-16.9707Zm-5.65625,11.31347-90.51074,90.50977a3.99855,3.99855,0,0,1-5.65625,0L30.89551,127.0625a3.993,3.993,0,0,1-1.09473-3.61328l15.6084-78.04,78.04-15.6084a3.99944,3.99944,0,0,1,3.61328,1.09473L231.51465,135.34863a3.99855,3.99855,0,0,1,0,5.65625ZM92,84a8,8,0,1,1-8-8A8.00917,8.00917,0,0,1,92,84Z" />
                      </svg>
                    </div>
                  </div>
                )}
              </Box>
            </div>

            {/* <div style={{ fontSize: "18px" }}>Mô tả: {description}</div> */}

            {!session?.user && (
              <span
                onClick={handleShow}
                style={{
                  position: "absolute",
                  top: 120,
                  right: 10,
                  lineHeight: "24px",
                  padding: "0px 6px",
                  fontSize: "20px",
                  borderRadius: "50%",
                  background: "green",
                  color: "#fff",
                }}
              >
                +
              </span>
            )}

            {session?.user?.role === "owner" && (
              <Button
                color="error"
                onClick={() => deleteFood(food.id)}
                style={{
                  position: "absolute",
                  bottom: 22,
                  width: "40px",
                  right: 6,
                }}
              >
                Xóa
              </Button>
            )}

            {session?.user?.role === "owner" && (
              <Button
                color="warning"
                onClick={() => handleFood(food)}
                style={{
                  position: "absolute",
                  bottom: 22,
                  width: "40px",
                  right: 50,
                }}
              >
                Sửa
              </Button>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      {show === "createOrder" && (
        <CreateOrder handleClose={handleClose} food={food} show={show} />
      )}

      {show === "updateFood" && (
        <UpdateFood
          listCategory={listCategory}
          handleClose={handleClose}
          show={show === "updateFood"}
          food={currentFood}
        />
      )}
    </Grid>
  );
}
