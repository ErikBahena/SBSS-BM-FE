import React, { useState } from "react";

import { useMutation } from "react-query";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Avatar,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
  IconButton,
  TableContainer,
  Grid,
  useMediaQuery,
  Divider,
} from "@mui/material";

import { EditOutlined } from "@mui/icons-material";

import ConfirmDeletionDialog from "../confirm-deletion-dialog";

import { getInitials } from "../../utils/get-initials";
import { capitalizeFirstLetter } from "src/utils/letter-utils";

const TableCellWithStyle = ({ children, sx: propSx }) => {
  return <TableCell sx={{ p: "0 10px", width: "max-content", ...propSx }}>{children}</TableCell>;
};

export const ListResults = ({ data = [], type, deleteResourceFunc, refetchMainResource }) => {
  const { mutate: deleteResourceMutate } = useMutation(deleteResourceFunc, {
    onSuccess: () => refetchMainResource(),
    onError: (err) => console.log(err),
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (e) => setLimit(e.target.value);

  const handlePageChange = (_, newPage) => setPage(newPage);

  const capitalizedType = type ? capitalizeFirstLetter(type) : null;

  const matches = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <>
      {data && !!data.length && (
        <Card>
          <PerfectScrollbar>
            <TableContainer>
              <Table sx={{ maxHeight: { xs: 300, md: 500 } }}>
                <TableHead sx={{ display: { xs: "none", sm: "table-header-group" } }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Registration Date</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {data.slice(page * limit, page * limit + limit).map((el, i) => {
                    if (matches)
                      return (
                        <React.Fragment key={uuid()}>
                          <TableRow>
                            <TableCellWithStyle sx={{ fontWeight: "bold" }}>
                              Name:
                            </TableCellWithStyle>
                            <TableCellWithStyle sx={{ fontWeight: "bold" }}>
                              {el.first_name} {el.last_name}
                            </TableCellWithStyle>

                            <TableCellWithStyle>
                              <IconButton>
                                <EditOutlined />
                              </IconButton>
                            </TableCellWithStyle>

                            <TableCellWithStyle>
                              <ConfirmDeletionDialog
                                title={`Delete ${capitalizedType}`}
                                onConfirm={() => deleteResourceMutate(el[`${type}_id`])}
                                tooltipTitle={`Delete ${capitalizedType}`}
                              >
                                Are you sure you want to delete your {type}:{" "}
                                <b>
                                  {el.first_name} {el.last_name}
                                </b>
                                <br />
                                This can&apos;t be undone and is not recommended. All information
                                regarding this {type} will be lost forever including any relations
                                in the jobs tab
                              </ConfirmDeletionDialog>
                            </TableCellWithStyle>
                          </TableRow>

                          <TableRow>
                            <TableCellWithStyle>Email:</TableCellWithStyle>
                            <TableCellWithStyle>{el.email}</TableCellWithStyle>
                          </TableRow>

                          <TableRow>
                            <TableCellWithStyle>Location:</TableCellWithStyle>
                            <TableCellWithStyle>
                              {`${el.address.city}, ${el.address.state}, ${el.address.country}`}
                            </TableCellWithStyle>
                          </TableRow>

                          <TableRow>
                            <TableCellWithStyle>Phone:</TableCellWithStyle>
                            <TableCellWithStyle>{el.phone}</TableCellWithStyle>
                          </TableRow>

                          <TableRow>
                            <TableCellWithStyle>Registered:</TableCellWithStyle>
                            <TableCellWithStyle>
                              {format(new Date(el.created_at), "MM/dd/yyyy")}
                            </TableCellWithStyle>
                          </TableRow>

                          {/* <TableRow>
                            <TableCellWithStyle>Edit:</TableCellWithStyle>
                            <TableCellWithStyle>
                              <IconButton>
                                <EditOutlined />
                              </IconButton>
                            </TableCellWithStyle>
                          </TableRow> */}

                          {/* <TableRow>
                            <TableCellWithStyle>Delete:</TableCellWithStyle>
                            <TableCellWithStyle>
                              <ConfirmDeletionDialog
                                title={`Delete ${capitalizedType}`}
                                onConfirm={() => deleteResourceMutate(el[`${type}_id`])}
                                tooltipTitle={`Delete ${capitalizedType}`}
                              >
                                Are you sure you want to delete your {type}:{" "}
                                <b>
                                  {el.first_name} {el.last_name}
                                </b>
                                <br />
                                This can&apos;t be undone and is not recommended. All information
                                regarding this {type} will be lost forever including any relations
                                in the jobs tab
                              </ConfirmDeletionDialog>
                            </TableCellWithStyle>
                          </TableRow> */}
                        </React.Fragment>
                      );

                    if (!matches)
                      return (
                        <TableRow key={uuid()}>
                          <TableCell>
                            <Box
                              sx={{
                                alignItems: "center",
                                display: "flex",
                              }}
                            >
                              <Avatar src={el.photo_url} sx={{ mr: 2 }}>
                                {getInitials(`${el.first_name} ${el.last_name}`)}
                              </Avatar>

                              <Typography color="textPrimary" variant="body1">
                                {el.first_name} {el.last_name}
                              </Typography>
                            </Box>
                          </TableCell>

                          <TableCell>{el.email}</TableCell>

                          <TableCell>
                            {`${el.address.city}, ${el.address.state}, ${el.address.country}`}
                          </TableCell>

                          <TableCell>{el.phone}</TableCell>

                          <TableCell>{format(new Date(el.created_at), "MM/dd/yyyy")}</TableCell>

                          <TableCell>
                            <IconButton>
                              <EditOutlined />
                            </IconButton>
                          </TableCell>

                          <TableCell>
                            <ConfirmDeletionDialog
                              title={`Delete ${capitalizedType}`}
                              onConfirm={() => deleteResourceMutate(el[`${type}_id`])}
                              tooltipTitle={`Delete ${capitalizedType}`}
                            >
                              Are you sure you want to delete your {type}:{" "}
                              <b>
                                {el.first_name} {el.last_name}
                              </b>
                              <br />
                              This can&apos;t be undone and is not recommended. All information
                              regarding this {type} will be lost forever including any relations in
                              the jobs tab
                            </ConfirmDeletionDialog>
                          </TableCell>
                        </TableRow>
                      );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={data.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[3, 10, 25]}
          />
        </Card>
      )}
    </>
  );
};
