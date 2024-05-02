import { useChangePassword } from "@/services";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Divider,
  TextField,
} from "@mui/material";
import { useCallback, useState } from "react";
import { toast } from "react-toastify";

export const SettingsPassword = () => {
  const [values, setValues] = useState({
    newPassword: "",
    password: "",
  });

  const { mutateAsync: changePassword } = useChangePassword();

  const handleChange = useCallback((event: any) => {
    setValues((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  const handleSubmit = async () => {
    const data = await changePassword(values);

    if (data) {
      toast.success("Thay đổi mật khẩu thành công");
    }
  };

  return (
    <form>
      <Card>
        <CardHeader title="Thay đổi mật khẩu tài khoản" />
        <Divider />
        <CardContent>
          <div style={{ display: "flex", gap: 40 }}>
            <TextField
              fullWidth
              label="Mật khẩu cũ"
              name="password"
              onChange={handleChange}
              type="password"
              value={values.password}
            />
            <TextField
              fullWidth
              label="Mật khẩu mới"
              name="newPassword"
              onChange={handleChange}
              type="password"
              value={values.newPassword}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            style={{ marginRight: "16px" }}
            onClick={handleSubmit}
            variant="contained"
          >
            Cập nhật
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
