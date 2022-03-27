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
      start: employeeLaborData.start,
      end: employeeLaborData.end,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(255).required("can't be blank"),
      start: Yup.date().required("must provide a start date"),
      end: Yup.date().required("must provide a end date"),
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
      <IconButton onClick={(e) => setAnchorEl(e.target)}>
        <EditOutlined />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
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
        sx={{ maxWidth: { xs: "auto", md: "350px", lg: "500px" } }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
          <Card>
            <CardHeader title={"Edit Employee Labor"} padding="10px" />
            <Divider />

            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.start && formik.errors.start)}
                    helperText={formik.touched.start && formik.errors.start}
                    id="datetime-local"
                    label="Start"
                    type="datetime-local"
                    fullWidth
                    onChange={({ target }) => formik.setFieldValue("start", target.value)}
                    value={formik.values.start}
                  />
                </Grid>
                <Grid item md={12} xs={12}>
                  <TextField
                    error={Boolean(formik.touched.end && formik.errors.end)}
                    helperText={formik.touched.end && formik.errors.end}
                    id="datetime-local"
                    label="End"
                    type="datetime-local"
                    fullWidth
                    value={formik.values.end}
                    onChange={({ target }) => formik.setFieldValue("end", target.value)}
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
