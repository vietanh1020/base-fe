import { EmptyLayout } from "@/components/layouts/EmptyLayout";
import { useRegister } from "@/services";
import { MyNextPage } from "@/types";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import Container from "@mui/material/Container";
import FormControlLabel from "@mui/material/FormControlLabel";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useFormik } from "formik";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import * as Yup from "yup";

const validationSchema = Yup.object({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  email: Yup.string().email(),
  password: Yup.string().required(),
  terms: Yup.bool().oneOf(
    [true],
    "You need to accept the terms and conditions"
  ),
});

const SignUp: MyNextPage = () => {
  const { mutateAsync: register } = useRegister();
  const router = useRouter();

  const { handleSubmit, values, errors, touched, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        terms: false,
      },
      validationSchema: validationSchema,
      onSubmit: async () => {
        const res = await register(values);
        let result;
        if (res) {
          result = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          });
        }

        if (result?.error) {
          toast.error("error");
        }

        if (result?.ok) router.push("/");
      },
    });

  console.log(errors);

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
            Sign up
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  name="firstName"
                  fullWidth
                  label="First Name"
                  error={!!errors.firstName}
                  value={values.firstName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  error={!!errors.lastName}
                  value={values.lastName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  error={!!errors.email}
                  label="Email Address"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  name="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  name="password"
                  error={!!errors.password}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  label="Password"
                  type="password"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="terms"
                      sx={{
                        color: "red",
                      }}
                      value={values.terms}
                      onChange={handleChange}
                      color="primary"
                    />
                  }
                  label="I want to receive inspiration, marketing promotions and updates via email."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/auth/sign-in" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </form>
  );
};

SignUp.layout = EmptyLayout;

export default SignUp;
