import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import CustomizedDialogs from "../modals/Modal";
import { useState } from "react";

export default function Food() {
  const [show, setShow] = useState(false);

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
            image="https://scontent.fhan9-1.fna.fbcdn.net/v/t39.30808-6/387841119_1769731203545112_6124233819149364047_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=dd5e9f&_nc_ohc=4TQgDO1XZE4AX9FQqMY&_nc_ht=scontent.fhan9-1.fna&oh=00_AfC8ksGjgUr7gtlNaYns5_LUssvV-6WA60myJZ-p1HtURA&oe=658C63AA"
            alt="green iguana"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ mb: 2, py: 1, px: 1 }}>
            <Typography variant="body2" color="text.secondary" pb={1}>
              Cam dứa
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
              40.000
            </Typography>

            <span
              onClick={handleShow}
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
              +
            </span>
          </CardContent>
        </CardActionArea>
      </Card>

      {show && <CustomizedDialogs handleClose={handleClose} show={show} />}
    </Grid>
  );
}
