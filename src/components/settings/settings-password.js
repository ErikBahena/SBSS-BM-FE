import { useFormik } from "formik";
import { useMutation } from "react-query";
import { useState } from "react";
import { updateUserPassword } from "src/fetch-functions";
import { useSelector } from "react-redux";

import { ALERT_SHOW_TIME_IN_MS } from "src/config";

import * as Yup from "yup";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  TextField,
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const SettingsPassword = ({ email }) => {
  const [oldPwVisible, setOldPwVisibility] = useState(false);
  const [newPwVisible, setNewPwVisibility] = useState(false);

  const [pwUpdateSuccess, setPwUpdateSuccess] = useState(false);

  const user_id = useSelector((state) => state.user.user_id);

  const { mutate: mutateUpdatePassword, isLoading: updatePasswordLoading } = useMutation(
    updateUserPassword,
    {
      onSuccess: () => {
        setPwUpdateSuccess(true);

        setTimeout(() => setPwUpdateSuccess(false), ALERT_SHOW_TIME_IN_MS);

        formik.resetForm();
      },
      onError: (err) => {
        const errResponse = err.response.data;

        if (errResponse.type === "password")
          formik.setFieldError(errResponse.type, errResponse.message);
      },
    }
  );

  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().max(255).required("can't be blank"),
      newPassword: Yup.string().max(255).required("can't be blank"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      const updateObj = { ...formValues, email, user_id };

      mutateUpdatePassword(updateObj);
    },
  });

  return (
    <>
      {pwUpdateSuccess && (
        <Alert severity="success" sx={{ mb: 3 }}>
          Your password was successfully updated!
        </Alert>
      )}

      <form onSubmit={formik.handleSubmit}>
        <Card>
          <CardHeader subheader="Update password" title="Password" />
          <Divider />
          <CardContent>
            <TextField
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              label="Old Password"
              margin="normal"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={oldPwVisible ? "text" : "password"}
              value={formik.values.password}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setOldPwVisibility(!oldPwVisible)}
                      edge="end"
                    >
                      {oldPwVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              error={Boolean(formik.touched.newPassword && formik.errors.newPassword)}
              fullWidth
              helperText={formik.touched.newPassword && formik.errors.newPassword}
              label="New Password"
              margin="normal"
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={newPwVisible ? "text" : "password"}
              value={formik.values.newPassword}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setNewPwVisibility(!newPwVisible)}
                      edge="end"
                    >
                      {newPwVisible ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </CardContent>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "flex-end",
              p: 2,
            }}
          >
            <LoadingButton
              color="primary"
              variant="contained"
              type="submit"
              disabled={!formik.isValid}
              loading={updatePasswordLoading}
            >
              Update Password
            </LoadingButton>
          </Box>
        </Card>
      </form>
    </>
  );
};
