import { useFormik } from "formik";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";

import { addJobQFN, getUserClients } from "src/fetch-functions";

import { connect } from "react-redux";

import * as Yup from "yup";

import {
  Popover,
  Button,
  Card,
  CardHeader,
  Divider,
  CardContent,
  Grid,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

import DropDownSelect from "./employee-menu";

import NextLink from "next/link";
import { Users as UsersIcon } from "../../icons/users";

const AddJobPopover = ({ anchorEl, userId, refetchJobs }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const { isLoading: getClientsLoading, data: clients = [] } = useQuery(`clients`, () =>
    getUserClients(userId)
  );

  const { mutate: mutateAddJob, isLoading: addJobLoading } = useMutation(addJobQFN, {
    onSuccess: () => {
      refetchJobs();
      setAnchorEl(null);
      formik.resetForm();
    },
    onError: () => {
      alert("there was an error");
    },
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      client_id: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().max(255).required("can't be blank"),
      description: Yup.string().max(255).required("can't be blank"),
      client_id: Yup.mixed().required("you must select a client"),
    }),
    onSubmit: (formValues, { setErrors }) => {
      const newJob = { ...formValues, user_id: userId };

      mutateAddJob(newJob);
    },
  });

  return (
    <>
      <Button color="primary" variant="contained" onClick={(e) => setAnchorEl(e.target)}>
        Add Job
      </Button>

      <Popover
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        anchorEl={anchorEl}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <form onSubmit={formik.handleSubmit} autoComplete="false" autoCorrect="false">
          <Card sx={{ maxWidth: { md: "600px", sm: "auto" } }}>
            <CardHeader
              subheader={`easily store your details for future references`}
              title={"Add a Job"}
            />
            <Divider />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(formik.touched.title && formik.errors.title)}
                    helperText={formik.touched.title && formik.errors.title}
                    label="Title"
                    name="title"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    variant="outlined"
                  />
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    error={Boolean(formik.touched.description && formik.errors.description)}
                    helperText={formik.touched.description && formik.errors.description}
                    label="Description"
                    name="description"
                    onBlur={formik.handleBlur}
                    multiline
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    variant="outlined"
                  />
                </Grid>

                <Grid item md={6} xs={12}>
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
                      parentResourceId={userId}
                      asyncAdd={false}
                    />
                  )}
                </Grid>

                {clients.length < 1 && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2faded">
                      You have no registered clients. Please go to the clients page and register a new client
                    </Typography>
                    <NextLink href="/clients" passHref>
                      <Button
                        color="secondary"
                        component="a"
                        endIcon={<UsersIcon />}
                        fullWidth
                        sx={{ mt: 2 }}
                        variant="contained"
                        size="sizeSmall"
                      >
                        Clients
                      </Button>
                    </NextLink>
                  </Grid>
                )}
              </Grid>
            </CardContent>
            <Divider />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                p: 2,
                gap: 1,
              }}
            >
              <Button onClick={() => setAnchorEl(null)} color="cancel" variant="outlined">
                Cancel
              </Button>
              <LoadingButton
                color="primary"
                variant="contained"
                type="submit"
                disabled={!formik.isValid}
                loading={addJobLoading}
              >
                Save Details
              </LoadingButton>
            </Box>
          </Card>
        </form>
      </Popover>
    </>
  );
};

const mapStateToProps = (state) => ({
  userId: state.user.user_id,
});

export default connect(mapStateToProps)(AddJobPopover);
