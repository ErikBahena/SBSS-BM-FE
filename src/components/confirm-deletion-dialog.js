import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Tooltip,
  IconButton,
} from "@mui/material";

import { default as DeleteIcon } from "@mui/icons-material/DeleteForeverOutlined";

const ConfirmDeletionDialog = (props) => {
  const { title, children, onConfirm, tooltipTitle, iconColor = "default" } = props;
  const [open, setOpen] = useState(false);

  return (
    <>
      <Tooltip title={tooltipTitle}>
        <IconButton onClick={() => setOpen(true)} color={iconColor}>
          <DeleteIcon />
        </IconButton>
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
              onConfirm();
              setOpen(false);
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
