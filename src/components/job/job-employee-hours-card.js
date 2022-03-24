import { useFormik } from "formik";

import { format } from "date-fns";

import { useMutation } from "react-query";

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
import { GeneralListResults } from "../general-list-results";

const JobEmployeeHoursCard = ({
  anchorEl,
  open,
  setAnchorEl,
  employeeLabor = [],
  jobEmployeeId,
}) => {
  const defaultDateValue = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  const formik = useFormik({
    initialValues: {
      description: "",
      start: defaultDateValue,
      end: defaultDateValue,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(255).required("can't be blank"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      console.log(formValues, `post with job_employee_id : ${jobEmployeeId}`);
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
        horizontal: "right",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Card sx={{ maxWidth: { md: "1100px", sm: "auto" } }}>
        <CardHeader
          // subheader={`easily store your ${type.toLowerCase()}s details for future references`}
          title="Track and Edit your Employees hours"
        />
        <Divider />
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {employeeLabor.length ? (
                <GeneralListResults data={employeeLabor} type="job_employee_labor" />
              ) : null}
            </Grid>
            <Grid item xs={4}>
              <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
                <Grid container spacing={2}>
                  <Grid item md={12} xs={12}>
                    <TextField
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
                    Cancel
                  </Button>
                  <LoadingButton
                    color="primary"
                    variant="contained"
                    type="submit"
                    disabled={!formik.isValid}
                    loading={false}
                  >
                    Save Details
                  </LoadingButton>
                </Box>
              </form>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Popover>
  );
};

export default JobEmployeeHoursCard;
