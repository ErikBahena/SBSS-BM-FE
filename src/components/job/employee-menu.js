import React, { useState } from "react";

import { CircularProgress, Autocomplete, TextField, IconButton, Tooltip } from "@mui/material/";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

import AddCircleIcon from "@mui/icons-material/AddOutlined";

export default function DropDownSelect({
  isLoading,
  parentResourceId,
  addResourceFunc,
  data,
  textFieldLabel,
  asyncAdd,
  error,
  helperText,
  formikSetValue,
  formikValueName,
}) {
  const [_, setOpen] = useState(false);
  const [selectedResourceId, setResourceId] = useState(null);
  const [val, setVal] = useState(null);

  return (
    <Autocomplete
      sx={{ width: 300 }}
      value={val}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.id === value.id}
      getOptionLabel={(option) => option.label}
      options={data.map((el) => {
        return {
          label: `${el.first_name} ${el.last_name}`,
          id: el.id,
        };
      })}
      onChange={(e, newValue) => {
        setVal(newValue);
        if (newValue) {
          setResourceId(newValue.id);
          formikSetValue && formikSetValue(formikValueName, newValue.id);
        } else setResourceId(null);
      }}
      loading={isLoading}
      renderInput={(params) => {
        return (
          <TextField
            {...params}
            label={textFieldLabel}
            error={error}
            helperText={helperText}
            InputProps={{
              ...params.InputProps,
              endAdornment: (
                <>
                  {selectedResourceId && asyncAdd && (
                    <Tooltip title="add employee to job">
                      <IconButton
                        size="small"
                        onClick={() => {
                          if (addResourceFunc)
                            addResourceFunc(parentResourceId, selectedResourceId);
                          setOpen(false);
                          setVal(null);
                          setResourceId(null);
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
