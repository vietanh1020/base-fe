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
      <Card sx={{ bg: "transparent", border: "none", position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="200"
            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder${image}`}
            alt="green iguana"
            sx={{ objectFit: "cover" }}
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
                  <div style={{ width: "15px" }}>
                    <TagIcon color="orange"></TagIcon>
                  </div>
                </div>
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
