import React, { useState } from "react";

import { format } from "date-fns";

import { useQuery } from "react-query";
import { getJobEmployeeLaborByRangeQFN } from "src/fetch-functions";

import { Box, Typography, Divider, TextField } from "@mui/material";

const defaultDateValue = format(new Date(), "yyyy-MM-dd'T'HH:mm");

const LaborTotalsByRange = ({ jobEmployeeId }) => {
  const [startDateTime, setStartDateTime] = useState(defaultDateValue);
  const [endDateTime, setEndDateTime] = useState(defaultDateValue);

  const { isLoading, data, refetch } = useQuery(
    `employee_labor_by_range${jobEmployeeId}`,
    () => getJobEmployeeLaborByRangeQFN({ jobEmployeeId, startDateTime, endDateTime }),
    {
      enabled: false,
    }
  );

  const handleDateChange = (date, type) => {
    console.log(date, type);

    // setStartDateTime(format(date, "yyyy-MM-dd'T'HH:mm"));
    // setEndDateTime(format(date, "yyyy-MM-dd'T'HH:mm"));
  };

  console.log(data, "data");

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
    </Box>
  );
};

export default LaborTotalsByRange;
