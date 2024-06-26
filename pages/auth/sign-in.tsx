import { EmptyLayout } from "@/components/layouts/EmptyLayout";
import { MyNextPage } from "@/types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address"),
  password: Yup.string().required("Required"),
});

const LoginForm: MyNextPage = () => {
  const router = useRouter();

  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validationSchema: validationSchema,
      onSubmit: async (values) => {
        const result = await signIn("credentials", {
          email: values.email,
          password: values.password,
          redirect: false,
        });

        if (result?.error) {
          toast.error("Tên đăng nhập hoặc mật khẩu không đúng");
        }
        if (result?.ok) router.push("/");
      },
    });

  return (
    <form onSubmit={handleSubmit}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Đăng nhập
          </Typography>

          <TextField
            margin="normal"
            fullWidth
            value={values.email}
            error={!!errors?.email && touched.email}
            label="Địa chỉ email"
            onBlur={handleBlur}
            onChange={handleChange}
            name="email"
            autoComplete="off"
          />
          <TextField
            margin="normal"
            value={values.password}
            fullWidth
            error={!!errors?.password && touched.password}
            name="password"
            label="Mật khẩu"
            type="password"
            onBlur={handleBlur}
            onChange={handleChange}
            autoComplete="off"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Đăng nhập
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#">Quên mật khẩu?</Link>
            </Grid>
            <Grid item>
              <Link href="/auth/sign-up">
                {"Bạn không có tài khoản? Đăng ký"}
              </Link>
            </Grid>
          </Grid>

          {/* <Button
            type="button"
            onClick={() => {
              signIn("google", {
                callbackUrl: "/",
                redirect: true,
              });
            }}
            fullWidth
            color="secondary"
            variant="contained"
            sx={{ mt: 8, mb: 2 }}
          >
            Sign In With Google
          </Button> */}
        </Box>
      </Container>
    </form>
  );
};

LoginForm.layout = EmptyLayout;

export default LoginForm;
