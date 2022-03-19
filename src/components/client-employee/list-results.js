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
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { getInitials } from "../../utils/get-initials";
import { capitalizeFirstLetter } from "src/utils/letter-utils";

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
        <Card sx={{ maxWidth: 325 }}>
          <CardActionArea>
            <CardMedia
              component="img"
              height="150"
              image="data:image/jpeg;base64,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"
              alt="green iguana"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                There is nothing here 😕
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Add a new {capitalizeFirstLetter(type)} by clicking the <br />
                <b>Add {capitalizeFirstLetter(type)}</b> button and get started
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>
      )}
    </>
  );
};
