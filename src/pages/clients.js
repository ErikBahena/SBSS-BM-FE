import Head from "next/head";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useSearch } from "src/hooks";
import { clientSearchKeys } from "src/utils/fuzzy-search-keys";

import { connect } from "react-redux";
import { getUserClients } from "src/fetch-functions";

import { Box, Container, Skeleton, Stack } from "@mui/material";

import AddClientPopover from "src/components/client/add-client-popover";
import { ClientListResults } from "../components/client/client-list-results";
import { ClientListToolbar } from "../components/client/client-list-toolbar";
import { DashboardLayout } from "../components/dashboard-layout";

const Clients = ({ userId }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { status, data, refetch } = useQuery("clients", () => getUserClients(userId));

  const [orderedClients, handleSearch, searchTerm, setData] = useSearch("", data, clientSearchKeys);

  useEffect(() => data && setData(data), [data]);

  console.log(orderedClients);
  return (
    <>
      <Head>
        <title>Clients</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth={false}>
          {status === "loading" && (
            <Stack spacing={1}>
              <Skeleton variant="rectangular" width={"auto"} height={40} />
              <Skeleton variant="rectangular" width={"auto"} height={130} />
              <Skeleton variant="rectangular" width={"auto"} height={250} />
            </Stack>
          )}

          {status === "success" && (
            <>
              {Boolean(anchorEl) && (
                <AddClientPopover
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  setAnchorEl={setAnchorEl}
                  refetch={refetch}
                />
              )}
              <ClientListToolbar
                searchTerm={searchTerm}
                handleSearch={handleSearch}
                setAnchorEl={setAnchorEl}
              />
              <Box sx={{ mt: 3 }}>
                <ClientListResults clients={orderedClients} />
              </Box>
            </>
          )}

          {status === "error" && <h2>Error</h2>}
        </Container>
      </Box>
    </>
  );
};

Clients.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

const mapStateToProps = (state) => ({
  userId: state.user.user_id,
});

export default connect(mapStateToProps)(Clients);
