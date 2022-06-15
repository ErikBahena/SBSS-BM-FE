import React, { useState, useRef, useEffect } from "react";

import { format } from "date-fns";

import { useQuery } from "react-query";
import { getJobEmployeeLaborTotalsByRangeQFN } from "src/fetch-functions";

import { Box, Typography, Divider, TextField } from "@mui/material";

const defaultDateValue = format(new Date(), "yyyy-MM-dd'T'HH:mm");

const LaborTotalsByRange = ({ jobEmployeeId }) => {
  const [startDateTime, setStartDateTime] = useState(defaultDateValue);
  const [endDateTime, setEndDateTime] = useState(defaultDateValue);

  const { data = { hours: 0, minutes: 0 }, refetch } = useQuery(
    `employee_labor_totals_by_range${jobEmployeeId}`,
    () => getJobEmployeeLaborTotalsByRangeQFN({ jobEmployeeId, startDateTime, endDateTime }),
    {
      enabled: false,
    }
  );

  useEffect(() => refetch(), [startDateTime, endDateTime]);

  return (
    <Box>
      <Typography variant="overline" fontSize={14}>
        Labor Totals by Range
      </Typography>
      <Divider />
      <TextField
        // error={Boolean(formik.touched.startDateTime && formik.errors.startDateTime)}
        // helperText={formik.touched.startDateTime && formik.errors.startDateTime}
        label="Start Date Time"
        type="datetime-local"
        fullWidth
        onChange={({ target }) => setStartDateTime(target.value)}
        value={startDateTime}
        sx={{ my: 2 }}
      />
      <TextField
        // error={Boolean(formik.touched.startDateTime && formik.errors.startDateTime)}
        // helperText={formik.touched.startDateTime && formik.errors.startDateTime}
        label="End Date Time"
        type="datetime-local"
        fullWidth
        onChange={({ target }) => setEndDateTime(target.value)}
        value={endDateTime}
      />
      <Divider sx={{ mt: 2 }} />
      {`${data.hours} hour(s)`} {`${data.minutes} minute(s)`}
    </Box>
  );
};

export default LaborTotalsByRange;
