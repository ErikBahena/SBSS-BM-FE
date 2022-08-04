import { useState } from "react";
import { useFormik } from "formik";
import { useMutation } from "react-query";

import { editJobEmployeeLaborQFN } from "src/fetch-functions";

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
  IconButton,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { EditOutlined } from "@mui/icons-material";

const EditEmployeeHoursPopover = ({ refetchEmployeeLabor, employeeLaborData }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { isLoading: editLaborLoading, mutate: editEmployeeLaborMutate } = useMutation(
    editJobEmployeeLaborQFN,
    {
      onSuccess: () => refetchEmployeeLabor(),
    }
  );

  const formik = useFormik({
    initialValues: {
      description: employeeLaborData.description,
      startDateTime: employeeLaborData.startDateTime,
      endDateTime: employeeLaborData.endDateTime,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(255).required("can't be blank"),
      startDateTime: Yup.date().required("must provide a start date"),
      endDateTime: Yup.date().required("must provide a end date"),
    }),
    onSubmit: (formValues, { resetForm }) => {
      const editedEvent = { ...formValues };
      const { job_employee_labor_id } = employeeLaborData;

      resetForm();

      editEmployeeLaborMutate({ editedEvent, job_employee_labor_id });
    },
  });

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.target)} color="info">
        <EditOutlined />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        anchorOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
          <Card sx={{ maxWidth: { sm: "350px" } }}>
            <CardHeader title={"Edit Employee Labor"} padding="10px" />
            <Divider />

            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.startDateTime && formik.errors.startDateTime)}
                    helperText={formik.touched.startDateTime && formik.errors.start}
                    id="datetime-local"
                    label="Start"
                    type="datetime-local"
                    fullWidth
                    onChange={({ target }) => formik.setFieldValue("startDateTime", target.value)}
                    value={formik.values.startDateTime}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.endDateTime && formik.errors.endDateTime)}
                    helperText={formik.touched.endDateTime && formik.errors.endDateTime}
                    id="datetime-local"
                    label="End"
                    type="datetime-local"
                    fullWidth
                    value={formik.values.endDateTime}
                    onChange={({ target }) => formik.setFieldValue("endDateTime", target.value)}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(formik.touched.description && formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    multiline
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    value={formik.values.description}
                    variant="outlined"
                  />
                </Grid>
              </Grid>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  p: 2,
                  gap: 1,
                }}
              >
                <Button onClick={() => setAnchorEl(null)} color="cancel" variant="outlined">
                  Close
                </Button>
                <LoadingButton
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!formik.isValid}
                  loading={editLaborLoading}
                >
                  Edit Details
                </LoadingButton>
              </Box>
            </CardContent>
          </Card>
        </form>
      </Popover>
    </>
  );
};

export default EditEmployeeHoursPopover;
