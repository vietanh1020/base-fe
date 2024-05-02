import { CardContent, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { styled } from "@mui/material/styles";
import { setCookie } from "cookies-next";
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

export default function UserInformation({ handleClose, show }: any) {
  const validationSchema = Yup.object({
    customerName: Yup.string().required("Tên không được để trống"),
  });

  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        customerName: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        setCookie("customerName", values.customerName);
        handleClose();
      },
    });

  return (
    <Modal open={show}>
      <DialogContent dividers sx={{ p: 0 }}>
        <h2 style={{ textAlign: "center", margin: "16px 0 0 0" }}>Thông tin</h2>
        <CardContent style={{ padding: "16px 20px" }}>
          <form action="" onSubmit={handleSubmit}>
            <TextField
              margin="normal"
              value={values.customerName}
              error={!!errors?.customerName && touched.customerName}
              name="customerName"
              label="Tên khách hàng"
              type="text"
              onBlur={handleBlur}
              onChange={handleChange}
              autoComplete="off"
            />

            <Button
              variant="contained"
              sx={{
                borderRadius: "4px",
                margin: "24px auto",
                padding: "4px 30px ",
                display: "flex",
              }}
              autoFocus
              onClick={() => handleSubmit()}
            >
              Lưu
            </Button>
          </form>
        </CardContent>
      </DialogContent>
    </Modal>
  );
}
