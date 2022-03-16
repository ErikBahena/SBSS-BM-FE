import Head from "next/head";

import { connect } from "react-redux";
import { useQuery } from "react-query";
import { getUserJobs } from "src/fetch-functions";

import { Box, Container, Grid } from "@mui/material";

import { DashboardLayout } from "../components/dashboard-layout";
import { JobListToolbar } from "src/components/job/job-list-toolbar";
import { JobCard } from "../components/job/job-card";

const Customers = ({ userId }) => {
  const { data, status } = useQuery("jobs", () => getUserJobs(userId));

  return (
    <>
      <Head>
        <title>Jobs | Material Kit</title>
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
          <Box sx={{ mt: 3 }}>
            {status === "success" && (
              <Grid container spacing={3}>
                {data.map((job) => {
                  return <JobCard key={job.job_id} job={job} />;
                })}
              </Grid>
            )}
          </Box>
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
