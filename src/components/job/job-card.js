import React from "react";
import NextLink from "next/link";

import { connect } from "react-redux";
import { useMutation } from "react-query";
import { deleteJobEmployeeQFN, addJobEmployeeQFN, deleteJobQFN } from "src/fetch-functions";

import { format } from "date-fns";
import { getInitials, capitalizeName } from "../../utils";

import { Box, Grid, Card, Typography, Avatar, CardContent, Link, Button } from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";
import { Users as UsersIcon } from "../../icons/users";

import EmployeeMenu from "../job/employee-menu";
import ConfirmDeletionDialog from "../confirm-deletion-dialog";
import NothingHereCard from "../nothing-here-card";
import JobEmployeeHoursCard from "./job-employee/job-employee-hours-card";

const JobCard = ({ job, refetchJobs }) => {
  const { isLoading: deleteEmployeeLoading, mutate } = useMutation(deleteJobEmployeeQFN, {
    onSuccess: () => refetchJobs(),
  });

  const { isLoading: deleteJobLoading, mutate: mutateDeleteJob } = useMutation(deleteJobQFN, {
    onSuccess: () => refetchJobs(),
    onError: (err) => console.log(err),
  });

  const { isLoading: addEmployeeLoading, mutate: mutateAddJobEmployee } = useMutation(
    addJobEmployeeQFN,
    {
      onSuccess: () => refetchJobs(),
    }
  );

  const deleteEmployeeFromJob = (job_id, employee_id) => mutate({ job_id, employee_id });

  const addJobEmployee = (job_id, employee_id) => mutateAddJobEmployee({ job_id, employee_id });

  const deleteJob = (job_id) => mutateDeleteJob(job_id);

  return (
    <Card sx={{ maxWidth: "800px", px: 2, py: 2, backgroundColor: "neutral.100" }}>
      <CardContent>
        <Box>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">{capitalizeName(job.title)}</Typography>

            <ConfirmDeletionDialog
              tooltipTitle="Delete Job"
              title="Delete this job?"
              onConfirm={() => deleteJob(job.job_id)}
            >
              Are you sure you want to remove job: <b>{capitalizeName(job.title)}</b>
              <br />
              This action can&apos;t be undone and all employee labor regarding this job will be
              lost, lost forever ♾
            </ConfirmDeletionDialog>
          </Box>

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

            <Box>
              <Typography sx={{ mb: { xs: 1, sm: 0 } }} variant="h6">
                {capitalizeName(`${job.client.first_name} ${job.client.last_name}`)}
              </Typography>

              <Box display="flex" flexWrap="wrap" sx={{ gap: { xs: 1, sm: 0 } }}>
                <Box display="flex" alignItems="center" sx={{ mr: 1 }}>
                  <EmailOutlinedIcon sx={{ mr: 0.6 }} />
                  <Typography variant="body1">
                    <Link
                      underline="hover"
                      color="inherit"
                      rel="noopener noreferrer"
                      target="_top"
                      href={`mailto:${job.client.email}`}
                      variant="body1"
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
          </Grid>

          <Grid item xs={12} sx={{ mt: 1 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" flexWrap="wrap">
              <Typography variant="overline" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
                Employees
              </Typography>

              {job.excluded_employees.length ? (
                <EmployeeMenu
                  data={job.excluded_employees}
                  textFieldLabel="Add an Employee"
                  parentResourceId={job.job_id}
                  addResourceFunc={addJobEmployee}
                  isLoading={addEmployeeLoading}
                  asyncAdd={true}
                />
              ) : (
                <Box>
                  <NextLink href="/employees" passHref>
                    <Button
                      color="secondary"
                      component="a"
                      endIcon={<UsersIcon />}
                      fullWidth
                      sx={{ mt: 2 }}
                      variant="contained"
                      size="sizeSmall"
                    >
                      Employees Page
                    </Button>
                  </NextLink>
                </Box>
              )}
            </Box>
          </Grid>

          {job.employees.length ? (
            job.employees.map((employee, i) => {
              const employeeFullName = capitalizeName(
                `${employee.first_name} ${employee.last_name}`
              );

              return (
                <Grid item xs={12} key={i} sx={{ mt: { xs: 1, sm: 0 } }}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar>{getInitials(`${employee.first_name} ${employee.last_name}`)}</Avatar>

                      <Typography variant="h6">{employeeFullName}</Typography>
                    </Box>

                    <Box display="flex">
                      <JobEmployeeHoursCard jobEmployeeId={employee.job_employee_id} />

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
            <NothingHereCard sx={{ mt: 3 }}>
              {job.excluded_employees.length
                ? "Add a new employee to this job from the Add an Employee drop down menu above"
                : ` You have no registered employees, go to the employees page and register a new 
                    Employee`}
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
