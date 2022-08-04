import React from "react";

import { useState } from "react";
import { useFormik } from "formik";
import { useQuery } from "react-query";

import { getUserClients } from "src/fetch-functions";
import { capitalizeName } from "src/utils";

import NextLink from "next/link";

import { connect } from "react-redux";
import * as Yup from "yup";
import withAuth from "src/components/auth/with-auth";

import { LoadingButton } from "@mui/lab";
import { Box, CardContent, Typography, Card, Container, Grid, Input } from "@mui/material";
import DropDownSelect from "src/components/job/employee-menu";

const Invoices = ({ userInfo }) => {
  const [logo, setLogo] = useState(null);
  const [updateLogoLoading, setUpdateLogoLoading] = useState(false);

  const { isLoading: getClientsLoading, data: clients = [] } = useQuery(`clients`, () =>
    getUserClients(userInfo.user_id)
  );

  const updateLogoAsync = async (e) => {
    return new Promise((resolve) => {
      return setTimeout(resolve(URL.createObjectURL(e.target.files[0])), 2000);
    });
  };

  console.log(clients);

  const formik = useFormik({
    initialValues: {
      client_id: "",
    },
    validationSchema: Yup.object({
      client_id: Yup.mixed().required("you must select a client"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      const newJob = { ...formValues, user_id: userId };

      //   mutateAddJob(newJob);
    },
  });

  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Business Logo</Typography>
                {logo && (
                  <img
                    src={logo}
                    style={{
                      height: "auto",
                      width: "100%",
                      maxWidth: "150px",
                      minHeight: "50px",
                    }}
                    loading="eager"
                  />
                )}

                <LoadingButton
                  color="primary"
                  fullWidth
                  variant="text"
                  component="label"
                  aria-label="upload picture"
                  loading={updateLogoLoading}
                >
                  Upload Logo
                  <Input
                    name="file"
                    onChange={(e) => updateLogoAsync(e).then((res) => setLogo(res))}
                    type="file"
                    sx={{ display: "none" }}
                    inputProps={{ hidden: true, accept: "image/png, image/jpeg" }}
                  />
                </LoadingButton>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Business Info</Typography>
                {capitalizeName(`${userInfo.first_name} ${userInfo.last_name}`)}
                <br />
                {userInfo.address.street}
                <br />
                {userInfo.address.city},{" "}
                {userInfo.address.state === "default" ? (
                  <NextLink href="/account"> Update </NextLink>
                ) : (
                  userInfo.address.state
                )}{" "}
                {userInfo.address.postal_code}
                <br />
                {userInfo.address.country}
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3} lg={6} sm={6} xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6">Client Info</Typography>
                <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
                  {clients.length > 0 && (
                    <DropDownSelect
                      error={Boolean(formik.touched.client_id && formik.errors.client_id)}
                      helperText={formik.touched.client_id && formik.errors.client_id}
                      formikSetValue={formik.setFieldValue}
                      formikValueName="client_id"
                      data={clients.map((cl) => {
                        return { ...cl, id: cl.client_id };
                      })}
                      textFieldLabel="Select a Client"
                      isLoading={getClientsLoading}
                      parentResourceId={userInfo.user_id}
                      asyncAdd={false}
                    />
                  )}
                </form>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xl={3} lg={3} sm={6} xs={12}></Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                width: 816,
                height: 1056,
                border: "1px solid red",
                mx: "auto",
              }}
            ></Box>
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}></Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}></Grid>
        </Grid>
      </Container>
    </Box>
  );
};

const mapStateToProps = (state) => {
  return {
    userInfo: state.user,
  };
};

export default withAuth(connect(mapStateToProps)(Invoices));
