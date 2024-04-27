import { formatNumber } from "@/utils/format";
import TagIcon from "@heroicons/react/24/outline/TagIcon";
import { Box, CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import { useState } from "react";
import CreateOrder from "../modals/CreateOrder";

export default function FoodShop(food: any) {
  const [show, setShow] = useState("");
  const { price, priceOrigin, name, image, listCategory } = food;
  const { data: session } = useSession();

  const handleShow = () => {
    setShow("createOrder");
  };
  const handleClose = () => {
    setShow("");
  };

  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ bg: "transparent", border: "none", position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="100"
            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder${image}`}
            alt="green iguana"
            sx={{
              objectFit: "contain",
            }}
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
                  top: 60,
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
          </CardContent>
        </CardActionArea>
      </Card>

      {show === "createOrder" && (
        <CreateOrder handleClose={handleClose} food={food} show={show} />
      )}
    </Grid>
  );
}
