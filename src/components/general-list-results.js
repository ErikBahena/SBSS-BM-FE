import { useState } from "react";
import { format } from "date-fns";
import { v4 as uuid } from "uuid";

import PerfectScrollbar from "react-perfect-scrollbar";

import {
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

import NothingHereCard from "./nothing-here-card";

export const GeneralListResults = ({ data = [], type }) => {
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedClientIds;

    if (event.target.checked) {
      newSelectedClientIds = data.map((el) => el[`${type}_id`]);
    } else {
      newSelectedClientIds = [];
    }

    setSelectedClientIds(newSelectedClientIds);
  };

  const handleSelectOne = (event, id) => {
    const selectedIndex = selectedClientIds.indexOf(id);
    let newSelectedClientIds = [];

    if (selectedIndex === -1) {
      newSelectedClientIds = newSelectedClientIds.concat(selectedClientIds, id);
    } else if (selectedIndex === 0) {
      newSelectedClientIds = newSelectedClientIds.concat(selectedClientIds.slice(1));
    } else if (selectedIndex === selectedClientIds.length - 1) {
      newSelectedClientIds = newSelectedClientIds.concat(selectedClientIds.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelectedClientIds = newSelectedClientIds.concat(
        selectedClientIds.slice(0, selectedIndex),
        selectedClientIds.slice(selectedIndex + 1)
      );
    }

    setSelectedClientIds(newSelectedClientIds);
  };

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
            <Box>
              <Table>
                <TableHead>
                  <TableRow>
                    {/* <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedClientIds.length === data.length}
                        color="primary"
                        indeterminate={
                          selectedClientIds.length > 0 && selectedClientIds.length < data.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell> */}
                    <TableCell>Start</TableCell>
                    <TableCell>End</TableCell>
                    <TableCell>Description</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(0, limit).map((el) => {
                    return (
                      <TableRow
                        hover
                        key={uuid()}
                        selected={selectedClientIds.indexOf(el[`${type}_id`]) !== -1}
                      >
                        {/* <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedClientIds.indexOf(el[`${type}_id`]) !== -1}
                            onChange={(event) => handleSelectOne(event, el[`${type}_id`])}
                            value="true"
                          />
                        </TableCell> */}

                        <TableCell>{format(new Date(el.start), "MM/dd/yyyy @h:mm a")}</TableCell>
                        <TableCell>{format(new Date(el.end), "MM/dd/yyyy @h:mm a")}</TableCell>

                        <TableCell>{el.description}</TableCell>
                        {/* <TableCell>{format(new Date(el.created_at), "MM/dd/yyyy")}</TableCell> */}
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

      {!data.length && <NothingHereCard>Add some work to the right!</NothingHereCard>}
    </>
  );
};
