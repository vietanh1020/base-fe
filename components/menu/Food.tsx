import { CardActionArea, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

export default function Food() {
  return (
    <Grid item xs={6} md={4}>
      <Card sx={{ bg: "transparent", border: "none" }}>
        <CardActionArea>
          <CardMedia
            component="img"
            image="/sp1.jpg"
            alt="green iguana"
            sx={{ objectFit: "cover" }}
          />
          <CardContent sx={{ mb: 2, py: 2, px: 1 }}>
            <Typography variant="body2" color="text.secondary" pb={1}>
              Cam dứa
            </Typography>

            <Typography gutterBottom variant="body2" component="h1">
              40.000
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}
