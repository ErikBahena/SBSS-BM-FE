import Head from "next/head";
import NextLink from "next/link";

import { useState } from "react";
import { connect } from "react-redux";
import { access } from "src/actions";
import { useRouter } from "next/router";
import { useFormik } from "formik";

import * as Yup from "yup";

import {
  Box,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LoadingButton from "@mui/lab/LoadingButton";
import TermsOfService from "src/components/register/terms-of-service";

const Register = ({ dispatch, isLoading }) => {
  const [tosOpen, setTosOpen] = useState(false);

  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      email: "",
      first_name: "",
      last_name: "",
      password: "",
      policy: false,
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("must provide a valid email")
        .max(255)
        .required("email is required to register"),
      first_name: Yup.string()
        .max(255)
        .test("empty-check", "first name is required to register", (first_name) =>
          first_name ? first_name.trim().length !== 0 : false
        ),
      last_name: Yup.string()
        .max(255)
        .test("empty-check", "last name is required to register", (last_name) =>
          last_name ? last_name.trim().length !== 0 : false
        ),
      password: Yup.string()
        .max(255)
        .test("password-check", "password is required to register", (password) =>
          password ? password.length !== 0 : false
        )
        .test("password-check", "password must be at least 5 characters", (password) =>
          password ? password.length >= 5 : false
        )
        .test("empty-check", "password can't contain spaces", (password) =>
          password ? !password.includes(" ") : false
        ),
      policy: Yup.boolean().oneOf([true], "must be checked to register"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      dispatch(access(formValues, () => router.push("/"), "register", setErrors));
    },
  });

  return (
    <>
      <Head>
        <title>SBSS | Register</title>
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
            <Box sx={{ my: 3 }}>
              <Typography color="textPrimary" variant="h4">
                Create a new account
              </Typography>
              <Typography color="textSecondary" gutterBottom variant="body2">
                use your email to create a new account
              </Typography>
            </Box>
            <TextField
              error={Boolean(formik.touched.first_name && formik.errors.first_name)}
              fullWidth
              helperText={formik.touched.first_name && formik.errors.first_name}
              label="First Name"
              margin="normal"
              name="first_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.first_name}
              variant="outlined"
            />
            <TextField
              error={Boolean(formik.touched.last_name && formik.errors.last_name)}
              fullWidth
              helperText={formik.touched.last_name && formik.errors.last_name}
              label="Last Name"
              margin="normal"
              name="last_name"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.last_name}
              variant="outlined"
            />
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
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                ml: -1,
              }}
            >
              <Checkbox
                checked={formik.values.policy}
                name="policy"
                onChange={formik.handleChange}
              />
              <Typography color="textSecondary" variant="body2">
                I have read the{" "}
                <NextLink href="#" passHref>
                  <Link
                    color="primary"
                    underline="always"
                    variant="subtitle2"
                    onClick={() => setTosOpen(true)}
                  >
                    Terms and Conditions
                  </Link>
                </NextLink>
              </Typography>
              <TermsOfService open={tosOpen} setOpen={setTosOpen} />
            </Box>
            {Boolean(formik.touched.policy && formik.errors.policy) && (
              <FormHelperText error sx={{ ml: 1.75 }}>
                {formik.errors.policy}
              </FormHelperText>
            )}
            <Box sx={{ py: 2 }}>
              <LoadingButton
                color="primary"
                loading={isLoading}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Sign Up Now
              </LoadingButton>
            </Box>
            <Typography color="textSecondary" variant="body2">
              Have an account?{" "}
              <NextLink href="/login" passHref>
                <Link variant="subtitle2" underline="hover">
                  Sign In
                </Link>
              </NextLink>
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

export default connect(mapStateToProps)(Register);
