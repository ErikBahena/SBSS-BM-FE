import Head from "next/head";
import { Box, Container, Typography } from "@mui/material";

import { useSelector } from "react-redux";

import { SettingsPassword } from "../components/settings/settings-password";
import withAuth from "src/components/auth/with-auth";

const Settings = () => {
  const user = useSelector((state) => state.user);

  return (
    <>
      <Head>
        <title>Settings | Material Kit</title>
      </Head>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container maxWidth="lg">
          <Typography sx={{ mb: 3 }} variant="h4">
            Settings
          </Typography>
          <Box sx={{ pt: 3 }}>
            <SettingsPassword email={user.email} />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default withAuth(Settings);
