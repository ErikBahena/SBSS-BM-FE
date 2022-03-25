import React, { useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip } from "@mui/material";

import { default as DeleteIcon } from "@mui/icons-material/DeleteForeverOutlined";
import { LoadingButton } from "@mui/lab";

const ConfirmDeletionDialog = (props) => {
  const { title, children, onConfirm, deleteEmployeeLoading } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title="Delete Employee from Job">
        <LoadingButton loading={deleteEmployeeLoading} onClick={() => setOpen(true)}>
          <DeleteIcon />
        </LoadingButton>
      </Tooltip>

      <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="confirm-dialog">
        <DialogTitle id="confirm-dialog">{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={() => setOpen(false)}>
            No
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              setOpen(false);
              onConfirm();
            }}
          >
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
export default ConfirmDeletionDialog;
