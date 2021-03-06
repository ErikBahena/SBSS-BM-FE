import { useFormik } from "formik";
import { useMutation } from "react-query";
import { connect } from "react-redux";

import { phoneRegExp } from "src/utils/regexExpressions";
import { states } from "../../__mocks__/states";

import * as Yup from "yup";

import {
  Popover,
  Button,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  TextField,
  Box,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

const AddResourcePopover = ({
  anchorEl,
  open,
  setAnchorEl,
  userId,
  refetch,
  addResourceFunc,
  type,
  title,
}) => {
  const { mutate, isLoading } = useMutation(addResourceFunc, {
    onSuccess: () => {
      refetch();
      setAnchorEl(null);
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      street: "",
      postal_code: "",
      city: "",
      state: "",
      country: "",
      phone: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("invalid email ⚠️").max(255).required("can't be blank 😝"),
      first_name: Yup.string().max(255).required("can't be blank"),
      last_name: Yup.string().max(255).required("can't be blank"),
      street: Yup.string().max(255).required("can't be blank"),
      city: Yup.string().max(255).required("can't be blank"),
      country: Yup.string().max(255).required("can't be blank"),
      postal_code: Yup.string().max(5, "can't be longer than 5 digits").required("can't be blank"),
      phone: Yup.string()
        .matches(phoneRegExp, "invalid phone number ⚠️")
        .required("can't be blank"),
      state: Yup.mixed().notOneOf(["default"]).required("you must select a state "),
    }),
    onSubmit: (formValues, { setErrors }) => {
      formValues.user_id = userId;

      mutate(formValues);
    },
  });

  return (
    <Popover
      open={open}
      onClose={() => setAnchorEl(null)}
      anchorEl={anchorEl}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
    >
      <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
        <Card sx={{ maxWidth: { md: "600px", sm: "auto" } }}>
          <CardHeader
            subheader={`easily store your ${type.toLowerCase()}s details for future references`}
            title={title}
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item md={6} xs={12}>
                <TextField
                  fullWidth
                  error={Boolean(formik.touched.first_name && formik.errors.first_name)}
                  helperText={formik.touched.first_name && formik.errors.first_name}
                  label="First Name"
                  name="first_name"
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
                  type="tel"
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
                  onBlur={formik.handleBlur}
                  value={formik.values.city}
                  variant="outlined"
                />
              </Grid>
              <Grid item md={6} xs={12}>
                <TextField
                  error={Boolean(formik.touched.state && formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                  fullWidth
                  label="Select State"
                  name="state"
                  onChange={formik.handleChange}
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
              gap: 1,
            }}
          >
            <Button onClick={() => setAnchorEl(null)} color="cancel" variant="outlined">
              Cancel
            </Button>
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
              loading={isLoading}
            >
              Save Details
            </LoadingButton>
          </Box>
        </Card>
      </form>
    </Popover>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.user_id,
});

export default connect(mapStateToProps)(AddResourcePopover);
