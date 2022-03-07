import { connect } from "react-redux";
import { useFormik } from "formik";
import { phoneRegExp } from "src/utils/regexExpressions";
import { states } from "../../__mocks__/states";

import * as Yup from "yup";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField,
} from "@mui/material";

const AccountProfileDetails = ({ user, dispatch }) => {
  const formik = useFormik({
    initialValues: {
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,

      street: user.address.street || "",
      postal_code: user.address.postal_code || "",
      city: user.address.city || "",
      state: user.address.state || "",
      country: user.address.country || "",
      phone: user.phone || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email").max(255).required("can't be blank"),
      first_name: Yup.string().max(255).required("can't be blank"),
      last_name: Yup.string().max(255).required("can't be blank"),
      street: Yup.string().max(255).required("can't be blank"),
      city: Yup.string().max(255).required("can't be blank"),
      country: Yup.string().max(255).required("can't be blank"),
      postal_code: Yup.string().max(5, "can't be longer than 5 digits").required("can't be blank"),
      phone: Yup.string().matches(phoneRegExp, "invalid phone number").required("can't be blank"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      // dispatch(access(formValues, () => router.push("/"), "login", setErrors));

      console.log(formValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
      <Card>
        <CardHeader
          subheader="use your business details, it will allow you to automate your invoices"
          title="Profile"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={3}>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.first_name && formik.errors.first_name)}
                helperText={formik.touched.first_name && formik.errors.first_name}
                label="First Name"
                name="first_name"
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.last_name && formik.errors.last_name)}
                helperText={formik.touched.last_name && formik.errors.last_name}
                label="Last Name"
                name="last_name"
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.email && formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                label="Email Address"
                name="email"
                required
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values.email}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.phone && formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                label="Phone Number"
                name="phone"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="number"
                value={formik.values.phone}
                variant="outlined"
              />
            </Grid>
            <Grid item md={12} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.street && formik.errors.street)}
                helperText={formik.touched.street && formik.errors.street}
                label="Street"
                name="street"
                onChange={formik.handleChange}
                required
                onBlur={formik.handleBlur}
                value={formik.values.street}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.city && formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
                label="City"
                name="city"
                onChange={formik.handleChange}
                required
                onBlur={formik.handleBlur}
                value={formik.values.city}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                label="Select State"
                name="state"
                onChange={formik.handleChange}
                required
                select
                SelectProps={{
                  native: true,
                  value: formik.values.state.toLowerCase(),
                }}
                variant="outlined"
              >
                {states.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </TextField>
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.postal_code && formik.errors.postal_code)}
                helperText={formik.touched.postal_code && formik.errors.postal_code}
                label="Postal Code"
                name="postal_code"
                onChange={formik.handleChange}
                required
                onBlur={formik.handleBlur}
                value={formik.values.postal_code}
                variant="outlined"
              />
            </Grid>
            <Grid item md={6} xs={12}>
              <TextField
                fullWidth
                error={Boolean(formik.touched.country && formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
                label="Country"
                name="country"
                onChange={formik.handleChange}
                required
                onBlur={formik.handleBlur}
                value={formik.values.country}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Divider />
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            p: 2,
          }}
        >
          <Button color="primary" variant="contained" type="submit" disabled={!formik.isValid}>
            Save Details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AccountProfileDetails);
