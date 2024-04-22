import { useGetCompany } from "@/services/CompanyService";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  TextField,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";

export const SettingCompany = () => {
  const { data: company } = useGetCompany();

  const [values, setValues] = useState({
    name: "",
    description: "",
    address: "",
    coverImage: "",
  });

  useEffect(() => {
    if (company) {
      setValues(company);
    }
  }, [company]);

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
        <CardContent
          sx={{ display: "flex", gap: "40px", alignItems: "center" }}
        >
          <div>
            <img
              style={{ objectFit: "cover", height: "300px" }}
              src="https://images.foody.vn/res/g117/1168187/prof/s640x400/foody-upload-api-foody-mobile-fo-a72ffcba-230418142410.jpeg"
              alt=""
            />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Cửa hàng</h3>
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Tên cửa hàng"
              name="name"
              onChange={handleChange}
              type="text"
              value={values.name}
            />
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Mô tả"
              name="description"
              onChange={handleChange}
              type="text"
              value={values.description}
            />

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Địa chỉ"
              name="address"
              onChange={handleChange}
              type="text"
              value={values.address}
            />

            {/* <Button variant="contained" component="label">
              Upload File
              <input type="file" hidden />
            </Button> */}
          </div>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button sx={{ mr: "16px" }} variant="contained">
            Cập nhật
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
