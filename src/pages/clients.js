import { useEffect } from "react";
import Head from "next/head";

import { connect } from "react-redux";
import { getUserClients } from "src/actions";

import { Box, Container, Skeleton, Stack } from "@mui/material";

import { ClientListResults } from "../components/client/client-list-results";
import { ClientListToolbar } from "../components/client/client-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Customers = ({ userClients, dispatch, isLoading }) => {
  useEffect(() => dispatch(getUserClients()), []);

  return (
    <>
      {console.log(isLoading, userClients)}
      <Head>
        <title>Customers</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          <ClientListToolbar />
          {isLoading ? (
            <Stack spacing={1} sx={{ mt: 3 }}>
              <Skeleton variant="rectangular" width={"auto"} height={50} />
              <Skeleton variant="rectangular" width={"auto"} height={200} />
              <Skeleton variant="rectangular" width={"auto"} height={50} />
            </Stack>
          ) : (
            <>
              <Box sx={{ mt: 3 }}>
                <ClientListResults clients={userClients} />
              </Box>
            </>
          )}
        </Container>
      </Box>
    </>
  );
};

Customers.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = (state) => ({
  userClients: state.userClients,
  isLoading: state.isLoading,
});

export default connect(mapStateToProps)(Customers);
