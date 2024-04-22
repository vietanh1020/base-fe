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

export const SettingsPassword = () => {
  const [values, setValues] = useState({
    password: "",
    confirm: "",
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
        <CardHeader title="Password" />
        <Divider />
        <CardContent>
          <div style={{ display: "flex", gap: 40 }}>
            <TextField
              fullWidth
              label="Mật khẩu Cũ"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Mật khẩu mới"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Xác nhận mật khẩu mới"
              name="confirm"
              onChange={handleChange}
              type="password"
              value={values.confirm}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button style={{ marginRight: "16px" }} variant="contained">
            Cập nhật
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
