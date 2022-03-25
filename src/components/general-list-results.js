import { useState } from "react";
import { format, differenceInMinutes, formatDistance, differenceInHours } from "date-fns";
import { v4 as uuid } from "uuid";

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

import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

export const GeneralListResults = ({ data = [], type }) => {
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
          <TableContainer sx={{ maxHeight: { xs: 300, md: 500 }, minHeight: { xs: 250, sm: 300 } }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Start</TableCell>
                  <TableCell>End</TableCell>
                  <TableCell>Duration</TableCell>
                  <TableCell>Description</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * limit, page * limit + limit).map((el) => {
                  const diff = new Date(el.end) - new Date(el.start);
                  const diffDate = new Date(diff);
                  const hours = diffDate.getUTCHours().toString();
                  const minutes = diffDate.getMinutes().toString();

                  if (minutes.length === 1) minutes = `0${minutes}`;

                  return (
                    <TableRow hover key={uuid()}>
                      <TableCell>{format(new Date(el.start), "MM/dd/yyyy @h:mm a")}</TableCell>
                      <TableCell>{format(new Date(el.end), "MM/dd/yyyy @h:mm a")}</TableCell>

                      <TableCell>
                        <Box display="flex" alignItems="center">
                          <AccessTimeOutlinedIcon
                            fontSize="small"
                            sx={{ mr: 0.5, display: { xs: "none", md: "initial" } }}
                          />
                          {`${hours}:${minutes}`}
                        </Box>
                      </TableCell>
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
