import { useFormik } from "formik";

import { useState, useEffect } from "react";
import { format } from "date-fns";

import { useMutation, useQuery } from "react-query";

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
  Tooltip,
  IconButton,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { GeneralListResults } from "./general-list-results";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NothingHereCard from "../../nothing-here-card";
import { addJobEmployeeLaborQFN, getJobEmployeeLaborQFN } from "src/fetch-functions";

import { calcEmployeeLaborTotal } from "src/utils";
import LaborTotalsByRange from "./labor-totals-by-range";

const JobEmployeeHoursCard = ({ jobEmployeeId }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const defaultDateValue = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  const {
    isLoading: employeeLaborLoading,
    data: employeeLabor = [],
    status: employeeLaborStatus,
    refetch: refetchEmployeeLabor,
  } = useQuery(`employee_labor${jobEmployeeId}`, () => getJobEmployeeLaborQFN(jobEmployeeId), {
    enabled: false,
  });

  useEffect(() => Boolean(anchorEl) && !employeeLabor.length && refetchEmployeeLabor(), [anchorEl]);

  const { isLoading: addLaborLoading, mutate: addEmployeeLaborMutate } = useMutation(
    addJobEmployeeLaborQFN,
    {
      onSuccess: () => refetchEmployeeLabor(),
    }
  );

  const formik = useFormik({
    initialValues: {
      description: "",
      startDateTime: defaultDateValue,
      endDateTime: defaultDateValue,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(255).required("can't be blank"),
      startDateTime: Yup.date().required("must provide a start date"),
      endDateTime: Yup.date().required("must provide a end date"),
    }),
    onSubmit: (formValues, { resetForm }) => {
      const newEvent = { ...formValues, job_employee_id: jobEmployeeId };

      resetForm();
      addEmployeeLaborMutate(newEvent);
    },
  });

  const laborTotals = calcEmployeeLaborTotal(employeeLabor);

  return (
    <>
      <Tooltip title="Edit Employee Hours">
        <IconButton onClick={(e) => setAnchorEl(e.target)} sx={{ ml: 1 }} color="info">
          <EditOutlinedIcon />
        </IconButton>
      </Tooltip>

      <Popover
        open={Boolean(anchorEl)}
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
          <CardHeader title="Track and Edit your Employees hours" />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                {employeeLaborLoading ? <div>Loading ...</div> : null}

                <GeneralListResults
                  data={employeeLabor}
                  type="job_employee_labor"
                  refetchEmployeeLabor={refetchEmployeeLabor}
                />

                {!employeeLabor.length && employeeLaborStatus === "success" && (
                  <NothingHereCard maxWidth={275}>Add some work to the right!</NothingHereCard>
                )}
              </Grid>

              <Grid item xs={12} md={4}>
                <Typography sx={{ py: 3 }}>Add Hours</Typography>

                <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
                  <Grid container spacing={2}>
                    <Grid item md={12} xs={12}>
                      <TextField
                        error={Boolean(formik.touched.startDateTime && formik.errors.startDateTime)}
                        helperText={formik.touched.startDateTime && formik.errors.startDateTime}
                        id="datetime-local"
                        label="Start"
                        type="datetime-local"
                        fullWidth
                        onChange={({ target }) =>
                          formik.setFieldValue("startDateTime", target.value)
                        }
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
                      loading={addLaborLoading}
                    >
                      Save Details
                    </LoadingButton>
                  </Box>
                </form>
              </Grid>

              <Grid item xs={12} md={4}>
                <Box>
                  <Typography variant="overline" fontSize={14}>
                    All Time Labor Total
                  </Typography>
                  <Divider />
                  {`${laborTotals.hours} hour(s)`} {`${laborTotals.minutes} minute(s)`}
                </Box>
              </Grid>
              <Grid item xs={12} md={8}>
                <LaborTotalsByRange jobEmployeeId={jobEmployeeId} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Popover>
    </>
  );
};

export default JobEmployeeHoursCard;
