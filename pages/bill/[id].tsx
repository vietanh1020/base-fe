import { useGetBillDetail } from "@/services";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";

function RestaurantDetailPage({ id }: any) {
  const { data: bill } = useGetBillDetail(id);
  return (
    <div>
      <IconButton color="primary">
        <ArrowBackIcon />
      </IconButton>
      <Typography variant="h4" component="h1" align="center" gutterBottom>
        Restaurant Name
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="h6" component="h2" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            condimentum tortor in urna scelerisque, nec consequat purus
            ullamcorper.
          </Typography>
          <Divider variant="middle" style={{ margin: "16px 0" }} />
          <Typography variant="h6" component="h2" gutterBottom>
            Address
          </Typography>
          <Typography variant="body1">
            123 Main Street, City, Country
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary">
            Book a Table
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { id } = context.query;

  return {
    props: {
      id,
    },
  };
}

export default RestaurantDetailPage;
