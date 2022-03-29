import { useFormik } from "formik";
import { useState } from "react";

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
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

export const SettingsPassword = ({ email }) => {
  const [oldPwVisible, setOldPwVisibility] = useState(false);
  const [newPwVisible, setNewPwVisibility] = useState(false);

  const formik = useFormik({
    initialValues: {
      oldPassword: "",
      newPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string().max(255).required("can't be blank"),
      newPassword: Yup.string().max(255).required("can't be blank"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      console.log(formValues);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <Card>
        <CardHeader subheader="Update password" title="Password" />
        <Divider />
        <CardContent>
          <TextField
            error={Boolean(formik.touched.oldPassword && formik.errors.oldPassword)}
            fullWidth
            helperText={formik.touched.oldPassword && formik.errors.oldPassword}
            label="Old Password"
            margin="normal"
            name="oldPassword"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            type={oldPwVisible ? "text" : "password"}
            value={formik.values.oldPassword}
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
            loading={false}
          >
            Update Password
          </LoadingButton>
        </Box>
      </Card>
    </form>
  );
};
