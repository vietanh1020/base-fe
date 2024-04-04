import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CreateOrder from "../modals/CreateOrder";
import { useState } from "react";
import { useDeleteFood } from "@/services/MenuService";
import { formatNumber } from "@/utils/format";
import { useSession } from "next-auth/react";

export default function Food(food: any) {
  const [show, setShow] = useState(false);
  const { mutateAsync: deleteFood } = useDeleteFood();
  const { price, name, image, description } = food;
  const { data: session } = useSession();

  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Grid item xs={6} md={3}>
      <Card sx={{ bg: "transparent", border: "none", position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder${image}`}
            alt="green iguana"
            sx={{ objectFit: "cover", maxHeight: "300px" }}
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
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Typography
                sx={{
                  py: 0,
                  fontWeight: 700,
                  fontSize: "20px",
                }}
                variant="body2"
                color="text.secondary"
                pb={1}
              >
                {name}
              </Typography>

              <Typography
                gutterBottom
                variant="body2"
                component="h4"
                sx={{
                  py: 0,
                  fontSize: "20px",
                  fontWeight: 700,
                }}
              >
                {formatNumber(price)}đ
              </Typography>
            </div>

            <div style={{ fontSize: "18px" }}>Mô tả: {description}</div>

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
                  background: "pink",
                  color: "#fff",
                }}
              >
                +
              </span>
            )}

            {session?.user?.role === "owner" && (
              <span
                onClick={() => deleteFood(food.id)}
                style={{
                  position: "absolute",
                  top: 80,
                  right: 10,
                  lineHeight: "24px",
                  padding: "0px 6px",
                  fontSize: "20px",
                  borderRadius: "50%",
                  background: "pink",
                  color: "#fff",
                }}
              >
                X
              </span>
            )}
          </CardContent>
        </CardActionArea>
      </Card>

      {show && (
        <CreateOrder handleClose={handleClose} food={food} show={show} />
      )}
    </Grid>
  );
}
