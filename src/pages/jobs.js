import Head from "next/head";
import { DashboardLayout } from "../components/dashboard-layout";

const Customers = () => (
  <>
    <Head>
      <title>Jobs | Material Kit</title>
    </Head>
    {/* <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <EmployeeListToolbar />
          <Box sx={{ mt: 3 }}>
            <CustomerListResults customers={customers} />
          </Box>
        </Container>
      </Box> */}
  </>
);
Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Customers;
