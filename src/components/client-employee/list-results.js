import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Avatar,
  Box,
  Card,
  Checkbox,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { capitalizeFirstLetter } from "src/utils/letter-utils";

export const ListResults = ({ data = [], type }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  return (
    <>
      {data && !!data.length && (
        <Card>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Registration Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(0, limit).map((el, i) => {
                    return (
                      <TableRow hover key={uuid()}>
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
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={data.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </Card>
      )}
    </>
  );
};
