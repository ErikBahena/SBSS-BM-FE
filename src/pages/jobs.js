import Head from "next/head";
import { Box, Container } from "@mui/material";
import { DashboardLayout } from "../components/dashboard-layout";
import { EmployeeListToolbar } from "src/components/employee/employee-list-toolbar";
import { JobListToolbar } from "src/components/job/job-list-toolbar";

const Customers = () => (
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
        <Box sx={{ mt: 3 }}>{/* <CustomerListResults customers={customers} /> */}</Box>
      </Container>
    </Box>
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
