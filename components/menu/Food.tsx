import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CreateOrder from "../modals/CreateOrder";
import { useState } from "react";
import { useDeleteFood } from "@/services/MenuService";

export default function Food(food: any) {
  const [show, setShow] = useState(false);
  const { mutateAsync: deleteFood } = useDeleteFood();
  const { price, name, image } = food;
  const handleShow = () => {
    setShow(true);
  };
  const handleClose = () => {
    setShow(false);
  };

  return (
    <Grid item xs={6} md={4}>
      <Card sx={{ bg: "transparent", border: "none", position: "relative" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image={`${process.env.NEXT_PUBLIC_MINIO_URL}/zorder/${image}`}
            alt="green iguana"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ mb: 2, py: 1, px: 1 }}>
            <Typography variant="body2" color="text.secondary" pb={1}>
              {name}
            </Typography>

            <Typography
              gutterBottom
              variant="body2"
              component="h1"
              sx={{
                py: 0,
                fontWeight: 700,
              }}
            >
              {price}
            </Typography>

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
          </CardContent>
        </CardActionArea>
      </Card>

      {show && (
        <CreateOrder handleClose={handleClose} food={food} show={show} />
      )}
    </Grid>
  );
}
