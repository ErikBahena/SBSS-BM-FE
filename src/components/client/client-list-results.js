import { useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import PropTypes from "prop-types";
import { format } from "date-fns";
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

export const ClientListResults = ({ clients }) => {
  const [selectedClientIds, setSelectedClientIds] = useState([]);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleSelectAll = (event) => {
    let newSelectedClientIds;

    if (event.target.checked) {
      newSelectedClientIds = clients.map((client) => client.id);
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
    <Card>
      {clients ? (
        <>
          <PerfectScrollbar>
            <Box sx={{ minWidth: 1050 }}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={selectedClientIds.length === clients.length}
                        color="primary"
                        indeterminate={
                          selectedClientIds.length > 0 && selectedClientIds.length < clients.length
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
                  {clients.slice(0, limit).map((client) => (
                    <TableRow
                      hover
                      key={client.client_id}
                      selected={selectedClientIds.indexOf(client.client_id) !== -1}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={selectedClientIds.indexOf(client.client_id) !== -1}
                          onChange={(event) => handleSelectOne(event, client.client_id)}
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
                          <Avatar src={client.photo_url} sx={{ mr: 2 }}>
                            {getInitials(`${client.first_name} ${client.last_name}`)}
                          </Avatar>
                          <Typography color="textPrimary" variant="body1">
                            {client.first_name} {client.last_name}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>{client.email}</TableCell>
                      <TableCell>
                        {`${client.address.city}, ${client.address.state}, ${client.address.country}`}
                      </TableCell>
                      <TableCell>{client.phone}</TableCell>
                      <TableCell>{format(new Date(client.created_at), "dd/MM/yyyy")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
          <TablePagination
            component="div"
            count={clients.length}
            onPageChange={handlePageChange}
            onRowsPerPageChange={handleLimitChange}
            page={page}
            rowsPerPage={limit}
            rowsPerPageOptions={[5, 10, 25]}
          />
        </>
      ) : (
        "no clients"
      )}
    </Card>
  );
};

ClientListResults.propTypes = {
  clients: PropTypes.array.isRequired,
};
