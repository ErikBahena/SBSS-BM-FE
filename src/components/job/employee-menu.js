import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";

import parse from "autosuggest-highlight/parse";
import match from "autosuggest-highlight/match";

export default function DropDownSelect({ employees, isLoading }) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(
    employees.map((em) => {
      return {
        title: `${em.first_name} ${em.last_name}`,
      };
    })
  );

  return (
    <Autocomplete
      sx={{ width: 300 }}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      getOptionLabel={(option) => option.title}
      options={options}
      loading={isLoading}
      renderInput={(params) => (
        <TextField
          {...params}
          label="Add an Employee"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <>
                {isLoading ? <CircularProgress color="inherit" size={20} /> : null}
                {params.InputProps.endAdornment}
              </>
            ),
          }}
        />
      )}
      renderOption={(props, option, { inputValue }) => {
        const matches = match(option.title, inputValue);
        const parts = parse(option.title, matches);

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
