import { useGetCompany, useUpdateCompany } from "@/services/CompanyService";
import {
  Box,
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

  const { mutateAsync: updateCompany } = useUpdateCompany();

  const [values, setValues] = useState({} as any);

  useEffect(() => {
    if (company) {
      setValues(company);
    }
  }, [company]);

  const handleChange = useCallback((event: any) => {
    setValues((prevState: any) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  }, []);

  return (
    <form>
      <Card>
        <CardContent
          sx={{ display: "flex", gap: "40px", alignItems: "center" }}
        >
          <div>
            <Box
              component="img"
              style={{ objectFit: "cover", height: "300px" }}
              src="https://afamilycdn.com/150157425591193600/2022/12/13/photo-1-1670904586512934218460-1670908755530-16709087556271475070156.png"
              alt=""
            />
          </div>
          <div>
            <h3 style={{ margin: 0 }}>Cửa hàng</h3>
            {/* <InputLabel>Tên cửa hàng</InputLabel> */}
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Tên cửa hàng"
              name="name"
              onChange={handleChange}
              type="text"
              value={values.name}
            />
            {/* <InputLabel>Mô tả</InputLabel> */}

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Mô tả"
              name="description"
              onChange={handleChange}
              type="text"
              value={values.description}
            />

            {/* <InputLabel>Địa chỉ</InputLabel> */}
            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Địa chỉ"
              name="address"
              onChange={handleChange}
              type="text"
              value={values.address}
            />

            <div
              style={{
                display: "flex",
                gap: "12px",
              }}
            >
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Thời gian mở cửa"
                name="openAt"
                onChange={handleChange}
                type="text"
                value={values.openAt}
              />

              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Thời gian đóng cửa"
                name="closeAt"
                onChange={handleChange}
                type="text"
                value={values.closeAt}
              />
            </div>

            <TextField
              sx={{ mt: 2 }}
              fullWidth
              label="Ngày mở cửa"
              name="openDay"
              onChange={handleChange}
              type="text"
              value={values.openDay}
            />
          </div>
        </CardContent>
        <Divider />
        <CardActions sx={{ justifyContent: "flex-end" }}>
          <Button
            sx={{ mr: "16px" }}
            onClick={() => updateCompany(values)}
            variant="contained"
          >
            Cập nhật
          </Button>
        </CardActions>
      </Card>
    </form>
  );
};
