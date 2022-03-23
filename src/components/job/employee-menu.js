import React, { useState } from "react";

import { CircularProgress, Autocomplete, TextField, IconButton, Tooltip } from "@mui/material/";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import AddCircleIcon from "@mui/icons-material/AddOutlined";

export default function DropDownSelect({ employees, isLoading }) {
  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setEmployeeId] = useState(null);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label}
      options={employees.map((em) => {
        return {
          label: `${em.first_name} ${em.last_name}`,
          id: em.id,
        };
      })}
      onChange={(e, newValue) => {
        newValue ? setEmployeeId(newValue.id) : setEmployeeId(null);
      }}
      loading={isLoading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label="Add an Employee"
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {selectedEmployeeId && (
                    <Tooltip title="add employee to job">
                      <IconButton
                        size="small"
                        onClick={() => {
                          console.log(`Add user with id: ${selectedEmployeeId}`);
                        }}
                      >
                        <AddCircleIcon />
                      </IconButton>
                    </Tooltip>
                  )}
                  {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                  {params.InputProps.endAdornment}
                </>
              ),
            }}
          />
        );
      }}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.label, inputValue);
        const parts = parse(option.label, matches);

        return (
          <li {...props}>
            <div>
              {parts.map((part, index) => (
                <span
                  key={index}
                  style={{
                    fontWeight: part.highlight ? 700 : 400,
                  }}
                >
                  {part.text}
                </span>
              ))}
            </div>
          </li>
        );
      }}
    />
  );
}
