import { useCallback, useState } from "react";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  Stack,
  TextField,
} from "@mui/material";

export const SettingCompany = () => {
  const [values, setValues] = useState({
    name: "",
    description: "",
    coverImage: "",
  });

  const handleChange = useCallback((event: any) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = useCallback((event: any) => {
    event.preventDefault();
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader title="Company" />
        <Divider />
        <CardContent>
          <Stack spacing={3} sx={{ maxWidth: 400 }}>
            <TextField
              fullWidth
              label="Company Name"
              name="name"
              onChange={handleChange}
              type="text"
              value={values.name}
            />
            <TextField
              fullWidth
              label="Company Description"
              name="description"
              onChange={handleChange}
              type="text"
              value={values.description}
            />

            <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button>
          </Stack>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button variant="contained">Update</Button>
        </CardActions>
      </Card>
    </form>
  );
};
