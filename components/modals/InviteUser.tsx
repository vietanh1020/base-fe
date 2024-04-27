import { useCreateStaff } from "@/services/CustomerService";
import { CardContent, Input, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import { useFormik } from "formik";
import * as Yup from "yup";

const Modal = styled(Dialog)(({ theme }) => ({
  margin: 0,
  "& .MuiDialogContent-root": {
    margin: 0,
    // padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    // padding: theme.spacing(1),
  },
}));

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

export default function InviteUser({ show, handleClose }: any) {
  const { mutateAsync: inviteUser } = useCreateStaff();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("Tên không được để trống"),
    lastName: Yup.string().required("Họ không được để trống"),
    email: Yup.string().required().email("Email không hợp lệ"),
    address: Yup.string().required("Địa chỉ không hợp lệ"),
    phone: Yup.string()
      .matches(/^\+?[0-9]\d{1,20}$/)
      .min(10)
      .max(12)
      .required(),
    password: Yup.string().required("Mật khẩu không được để trống"),
  });

  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        address: "",
        phone: "",
        password: "",
        avatar: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const res = await inviteUser({
          ...values,
          avatar: "",
        });
        if (res) handleClose();
      },
    });

  return (
    <Modal
      onClose={handleClose}
      aria-labelledby="customized-dialog-title"
      open={show}
    >
      <DialogContent dividers sx={{ p: 0 }}>
        <CardContent sx={{ width: "600px" }}>
          <h2 style={{ textAlign: "center", margin: 0 }}>Thêm nhân viên</h2>
          <form action="" onSubmit={handleSubmit}>
            <div style={{ display: "flex", gap: 30, alignItems: "center" }}>
              <TextField
                fullWidth
                margin="normal"
                value={values.firstName}
                error={!!errors?.firstName && touched.firstName}
                label="Tên"
                onBlur={handleBlur}
                onChange={handleChange}
                name="firstName"
                autoComplete="off"
              />

              <TextField
                fullWidth
                margin="normal"
                value={values.lastName}
                error={!!errors?.lastName && touched.lastName}
                label="Họ"
                onBlur={handleBlur}
                onChange={handleChange}
                name="lastName"
                autoComplete="off"
              />
            </div>

            <TextField
              fullWidth
              margin="normal"
              value={values.email}
              error={!!errors?.email && touched.email}
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              name="email"
              autoComplete="off"
            />

            <TextField
              fullWidth
              margin="normal"
              value={values.address}
              error={!!errors?.address && touched.address}
              label="Địa chỉ"
              onBlur={handleBlur}
              onChange={handleChange}
              name="address"
              autoComplete="off"
            />

            <TextField
              fullWidth
              margin="normal"
              value={values.phone}
              error={!!errors?.phone && touched.phone}
              label="Số điện thoại"
              onBlur={handleBlur}
              onChange={handleChange}
              name="phone"
              autoComplete="off"
            />

            <TextField
              fullWidth
              margin="normal"
              value={values.password}
              error={!!errors?.password && touched.password}
              label="Mật khẩu"
              onBlur={handleBlur}
              onChange={handleChange}
              name="password"
              type="password"
              autoComplete="off"
            />
          </form>
          <Button
            variant="contained"
            sx={{
              borderRadius: "4px",
              margin: "0 auto",
              padding: "4px 30px ",
              display: "flex",
            }}
            autoFocus
            onClick={() => handleSubmit()}
          >
            Lưu
          </Button>
        </CardContent>
      </DialogContent>
    </Modal>
  );
}
