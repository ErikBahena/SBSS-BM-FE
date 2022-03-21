import Head from "next/head";

import { connect } from "react-redux";
import { useQuery } from "react-query";
import { getUserJobs, getUserEmployees } from "src/fetch-functions";

import { Box, Container, Grid } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { JobListToolbar } from "src/components/job/job-list-toolbar";
import JobCard from "../components/job/job-card";

const Customers = ({ userId }) => {
  const { data, status, refetch: refetchJobs } = useQuery("jobs", () => getUserJobs(userId));

  return (
    <>
      <Head>
        <title>Jobs</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <JobListToolbar />

          {status === "success" && (
            <Grid container spacing={2} mt={3}>
              {data.map((job) => {
                return (
                  <Grid item key={job.id}>
                    <JobCard job={job} refetchJobs={refetchJobs} />
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>
    </>
  );
};

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = (state) => ({
  userId: state.user.user_id,
});

export default connect(mapStateToProps)(Customers);
