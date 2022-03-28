import Head from "next/head";

import { connect } from "react-redux";
import { useQuery } from "react-query";
import { getUserJobs } from "src/fetch-functions";

import { Box, Container, Grid } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { JobListToolbar } from "src/components/job/job-list-toolbar";
import JobCard from "../components/job/job-card";
import NothingHereCard from "src/components/nothing-here-card";

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
          <JobListToolbar refetchJobs={refetchJobs} />

          {status === "success" && data && (
            <Grid container spacing={2} mt={3}>
              {data.map((job, i) => {
                return (
                  <Grid item key={i}>
                    <JobCard job={job} refetchJobs={refetchJobs} />
                  </Grid>
                );
              })}
            </Grid>
          )}

          {status === "success" && !data.length && (
            <NothingHereCard>
              Add a job with the <b>Add Job</b> button above
            </NothingHereCard>
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
