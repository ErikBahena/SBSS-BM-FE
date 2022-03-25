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

import NothingHereCard from "../nothing-here-card";

export const ListResults = ({ data = [], type }) => {
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
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedClientIds.length === data.length}
                        color="primary"
                        indeterminate={
                          selectedClientIds.length > 0 && selectedClientIds.length < data.length
                        }
                        onChange={handleSelectAll}
                      />
                    </TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Registration date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.slice(0, limit).map((el, i) => {
                    return (
                      <TableRow
                        hover
                        key={uuid()}
                        selected={selectedClientIds.indexOf(el[`${type}_id`]) !== -1}
                      >
                        <TableCell padding="checkbox">
                          <Checkbox
                            checked={selectedClientIds.indexOf(el[`${type}_id`]) !== -1}
                            onChange={(event) => handleSelectOne(event, el[`${type}_id`])}
                            value="true"
                          />
                        </TableCell>
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

      {!data.length && (
        <NothingHereCard>
          Add a new {capitalizeFirstLetter(type)} by clicking the <br />
          <b>Add {capitalizeFirstLetter(type)}</b> button and get started
        </NothingHereCard>
      )}
    </>
  );
};
