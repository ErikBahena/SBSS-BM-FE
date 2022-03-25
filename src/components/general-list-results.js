import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

export const GeneralListResults = ({ data = [], type }) => {
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (event) => {
    setLimit(event.target.value);
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
    console.log(newPage, limit);
  };

  return (
    <>
      {data && !!data.length && (
        <Card>
          <TableContainer sx={{ maxHeight: { xs: 300, md: 500 }, minHeight: { xs: 250, sm: 300 } }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * limit, page * limit + limit).map((el) => {
                  return (
                    <TableRow hover key={uuid()}>
                      <TableCell>{format(new Date(el.start), "MM/dd/yyyy @h:mm a")}</TableCell>
                      <TableCell>{format(new Date(el.end), "MM/dd/yyyy @h:mm a")}</TableCell>

                      <TableCell>{el.description}</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>

          <TablePagination
            component="div"
            count={data.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[3, 5, 10, 25]}
          />
        </Card>
      )}
    </>
  );
};
