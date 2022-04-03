import Head from "next/head";
import NextLink from "next/link";

import * as Yup from "yup";

import { connect } from "react-redux";
import { access } from "src/actions";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import LoadingButton from "@mui/lab/LoadingButton";
import { Box, Button, Container, Grid, Link, TextField, Typography } from "@mui/material";
import { Facebook as FacebookIcon } from "../icons/facebook";
import { Google as GoogleIcon } from "../icons/google";

const guestCredentials = {
  email: "guest@gmail.com",
  password: "guestPassword!!221",
};

const SignIn = ({ dispatch, isLoading }) => {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Must be a valid email").max(255).required("Email is required"),
      password: Yup.string().max(255).required("Password is required"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      dispatch(access(formValues, () => router.push("/"), "login", setErrors));
    },
  });

  return (
    <>
      <Head>
        <title>Sign In</title>
      </Head>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          flexGrow: 1,
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm">
          <form onSubmit={formik.handleSubmit}>
            <Box>
              <Typography color="textPrimary" variant="h4" sx={{ mb: 1 }}>
                Sign in
              </Typography>
              {/* <Typography color="textSecondary" gutterBottom variant="body2">
                Sign in with Oauth
              </Typography> */}
            </Box>
            {/* <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Button
                  color="info"
                  fullWidth
                  startIcon={<FacebookIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Sign In with Facebook
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  color="error"
                  startIcon={<GoogleIcon />}
                  onClick={formik.handleSubmit}
                  size="large"
                  variant="contained"
                >
                  Sign In with Google
                </Button>
              </Grid>
            </Grid>
            <Box
              sx={{
                pb: 1,
                pt: 0,
              }}
            >
              <Typography align="center" color="textSecondary" variant="body1">
                sign in with email address
              </Typography>
            </Box> */}
            <TextField
              error={Boolean(formik.touched.email && formik.errors.email)}
              fullWidth
              helperText={formik.touched.email && formik.errors.email}
              label="Email Address"
              margin="normal"
              name="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="email"
              value={formik.values.email}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type="password"
              value={formik.values.password}
              variant="outlined"
            />
            <Box sx={{ py: 2 }}>
              <LoadingButton
                color="primary"
                loading={isLoading}
                disabled={!formik.isValid}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign In Now
              </LoadingButton>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Don&apos;t have an account?{" "}
              <NextLink href="/register">
                <Link
                  to="/register"
                  variant="subtitle2"
                  underline="hover"
                  sx={{
                    cursor: "pointer",
                  }}
                >
                  Sign Up
                </Link>
              </NextLink>
              {" | "}
              <Link
                variant="subtitle2"
                component="button"
                underline="hover"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(access(guestCredentials, () => router.push("/"), "login"));
                }}
                sx={{
                  cursor: "pointer",
                }}
              >
                Guest Account
              </Link>
            </Typography>
          </form>
        </Container>
      </Box>
    </>
  );
};
const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(SignIn);
