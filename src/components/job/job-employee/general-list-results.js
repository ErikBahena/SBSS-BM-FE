import { useState } from "react";
import { format } from "date-fns";
import { timeDiff } from "src/utils";
import { v4 as uuid } from "uuid";

import { useMutation } from "react-query";
import { deleteJobEmployeeLaborQFN } from "../../../fetch-functions";

import {
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

import ConfirmDeletionDialog from "../../confirm-deletion-dialog";
import EditEmployeeHoursPopover from "./edit-employee-hours";

export const GeneralListResults = ({ data = [], refetchEmployeeLabor }) => {
  const { mutate: deleteLaborMutate } = useMutation(deleteJobEmployeeLaborQFN, {
    onSuccess: () => refetchEmployeeLabor(),
  });

  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(0);

  const handleLimitChange = (e) => setLimit(e.target.value);

  const handlePageChange = (_, newPage) => setPage(newPage);

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
                  <TableCell>Edit</TableCell>
                  <TableCell>Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data.slice(page * limit, page * limit + limit).map((el, i) => {
                  const totalDiff = timeDiff(new Date(el.end), new Date(el.start), false, true);

                  return (
                    <TableRow hover key={uuid()}>
                      <TableCell>
                        {format(new Date(el.start), "MM/dd/yyyy")} <br />
                        {format(new Date(el.start), "h:mm a")}
                      </TableCell>

                      <TableCell>
                        {format(new Date(el.end), "MM/dd/yyyy")} <br />
                        {format(new Date(el.end), "h:mm a")}
                      </TableCell>

                      <TableCell>{totalDiff}</TableCell>
                      {/* <TableCell>{`${hours}:${minutes}`}</TableCell> */}

                      <TableCell>
                        <Typography
                          variant="p"
                          sx={{
                            display: "inline-block",
                            overflow: "auto",
                          }}
                        >
                          {el.description}
                        </Typography>
                      </TableCell>

                      <TableCell>
                        <EditEmployeeHoursPopover
                          refetchEmployeeLabor={refetchEmployeeLabor}
                          employeeLaborData={el}
                        />
                      </TableCell>

                      <TableCell>
                        <ConfirmDeletionDialog
                          title="Remove Employee Labor"
                          onConfirm={() => deleteLaborMutate(el.job_employee_labor_id)}
                          tooltipTitle="Delete Employee Labor"
                        >
                          Are you sure you want to delete this employees labor?
                          <br />
                          It will be lost forever ♾
                        </ConfirmDeletionDialog>
                      </TableCell>
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
