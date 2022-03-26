import React, { useEffect, useState } from "react";

import { connect } from "react-redux";
import { useMutation } from "react-query";
import { deleteJobEmployeeQFN, addJobEmployeeQFN } from "src/fetch-functions";

import { format } from "date-fns";
import { getInitials, capitalizeName } from "../../utils";

import {
  Box,
  Grid,
  Card,
  Typography,
  Avatar,
  CardContent,
  Divider,
  Link,
  Button,
  Tooltip,
  IconButton,
} from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

import EmployeeMenu from "../job/employee-menu";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";
import NothingHereCard from "../nothing-here-card";
import JobEmployeeHoursCard from "./job-employee/job-employee-hours-card";

const JobCard = ({ job, userId, isLoading, refetchJobs }) => {
  const { isLoading: deleteEmployeeLoading, mutate } = useMutation(deleteJobEmployeeQFN, {
    onSuccess: () => refetchJobs(),
  });

  const { isLoading: addEmployeeLoading, mutate: mutateAddJobEmployee } = useMutation(
    addJobEmployeeQFN,
    {
      onSuccess: () => refetchJobs(),
    }
  );

  const deleteEmployeeFromJob = (job_id, employee_id) => mutate({ job_id, employee_id });

  const addJobEmployee = (job_id, employee_id) => mutateAddJobEmployee({ job_id, employee_id });

  return (
    <Card sx={{ maxWidth: "800px", px: 2, py: 2, backgroundColor: "neutral.100" }}>
      <CardContent>
        <Box>
          <Typography variant="h6">{capitalizeName(job.title)}</Typography>
          <Typography sx={{ mb: 0.8 }} variant="body1">
            {job.description}
          </Typography>

          <Box display="flex" alignItems="center">
            <EventIcon sx={{ mr: 0.8 }} />
            <Typography variant="subtitle1">
              {format(new Date(job.created_at), "MM/dd/yyyy")}
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={1}>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography variant="overline" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
              Client
            </Typography>

            <Box display="flex" alignItems="center">
              <Avatar sx={{ mr: 1.5, display: { xs: "none", sm: "" } }}>
                {getInitials(`${job.client.first_name} ${job.client.last_name}`)}
              </Avatar>

              <Box>
                <Typography sx={{ mb: { xs: 0, sm: 0.3 } }} variant="h6">
                  {capitalizeName(`${job.client.first_name} ${job.client.last_name}`)}
                </Typography>

                <Box display="flex" flexWrap="wrap">
                  <Box display="flex" alignItems="center" sx={{ mr: 1 }}>
                    <EmailOutlinedIcon sx={{ mr: 0.6 }} />
                    <Typography variant="body1">
                      <Link
                        underline="hover"
                        color="inherit"
                        rel="noopener noreferrer"
                        target="_top"
                        href={`mailto:${job.client.email}`}
                      >
                        {job.client.email}
                      </Link>
                    </Typography>
                  </Box>

                  <Box display="flex" alignItems="center">
                    <LocalPhoneOutlinedIcon sx={{ mr: 0.6 }} />
                    <Typography variant="body1">{job.client.phone}</Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="overline" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                Employees
              </Typography>
              {job.excluded_employees.length ? (
                <EmployeeMenu
                  employees={job.excluded_employees}
                  jobId={job.job_id}
                  addJobEmployee={addJobEmployee}
                  addEmployeeLoading={addEmployeeLoading}
                />
              ) : null}
            </Box>
          </Grid>

          {job.employees.length ? (
            job.employees.map((employee, i) => {
              const employeeFullName = capitalizeName(
                `${employee.first_name} ${employee.last_name}`
              );

              return (
                <Grid item xs={12} key={i}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar>{getInitials(`${employee.first_name} ${employee.last_name}`)}</Avatar>

                      <Typography variant="h6">{employeeFullName}</Typography>
                    </Box>

                    <Box display="flex">
                      <JobEmployeeHoursCard
                        jobEmployeeId={employee.job_employee_id}
                      />

                      <ConfirmDeletionDialog
                        title="Remove this employee?"
                        onConfirm={() => deleteEmployeeFromJob(job.job_id, employee.id)}
                        tooltipTitle="Delete Employee from Job"
                      >
                        Are you sure you want to remove <b> {employeeFullName}</b> from this job?
                        All information regarding this job-employee relationship will be permanently
                        lost
                      </ConfirmDeletionDialog>
                    </Box>
                  </Box>
                </Grid>
              );
            })
          ) : (
            <NothingHereCard>
              Add a new employee to this job from the <b>Add an Employee</b> drop down menu above
            </NothingHereCard>
          )}
        </Grid>
      </CardContent>
    </Card>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.user_id,
});

export default connect(mapStateToProps)(JobCard);
