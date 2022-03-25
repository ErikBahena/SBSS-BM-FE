import { useFormik } from "formik";

import { useState } from "react";
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
  FormLabel,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import { GeneralListResults } from "../general-list-results";

import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import NothingHereCard from "../nothing-here-card";
import { addJobEmployeeLaborQFN, getJobEmployeeLaborQFN } from "src/fetch-functions";

const JobEmployeeHoursCard = ({ jobEmployeeId }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const defaultDateValue = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  const {
    isLoading: employeeLaborLoading,
    data: employeeLabor = [],
    refetch: refetchEmployeeLabor,
  } = useQuery(`employee_labor${jobEmployeeId}`, () => getJobEmployeeLaborQFN(jobEmployeeId), {
    enabled: false,
  });

  const { isLoading, mutate } = useMutation(addJobEmployeeLaborQFN, {
    onSuccess: () => refetchEmployeeLabor(),
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      start: defaultDateValue,
      end: defaultDateValue,
    },
    validationSchema: Yup.object({
      description: Yup.string().max(255).required("can't be blank"),
      start: Yup.date().required("must provide a start date"),
      end: Yup.date().required("must provide a end date"),
    }),
    onSubmit: (formValues, { resetForm }) => {
      const newEvent = { ...formValues, job_employee_id: jobEmployeeId };

      resetForm();
      mutate(newEvent);
    },
  });

  return (
    <>
      <Tooltip title="Edit Employee Hours">
        <IconButton
          onClick={(e) => {
            refetchEmployeeLabor();
            setAnchorEl(e.target);
          }}
          sx={{ ml: 1 }}
        >
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
          <CardHeader
            title="Track and Edit your Employees hours"
          />
          <Divider />
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                {employeeLaborLoading ? <div>Loading ...</div> : null}

                <GeneralListResults data={employeeLabor} type="job_employee_labor" />

                {!employeeLabor.length && !employeeLaborLoading && <NothingHereCard maxWidth={275}>Add some work to the right!</NothingHereCard>}
              </Grid>
              <Grid item xs={12} md={4}>
                <Typography sx={{ py: 3 }}>Add Employee Labor Hours</Typography>

                <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
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
                      loading={isLoading}
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
    </>
  );
};

export default JobEmployeeHoursCard;
