import {
  Box,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";
import AddJobPopover from "./add-job-popover";

export const JobListToolbar = ({ refetchJobs, handleSearch, searchTerm }) => (
  <>
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        m: -1,
      }}
    >
      <Typography sx={{ m: 1 }} variant="h4">
        Jobs
      </Typography>
      <Box sx={{ m: 1 }}>
        <AddJobPopover refetchJobs={refetchJobs} />
      </Box>
    </Box>

    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Box>
          <TextField
            fullWidth
            onChange={(e) => handleSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SvgIcon color="action" fontSize="small">
                    <SearchIcon />
                  </SvgIcon>
                </InputAdornment>
              ),
            }}
            value={searchTerm}
            placeholder="Search Jobs"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  </>
);
