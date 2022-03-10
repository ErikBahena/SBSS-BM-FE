import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  SvgIcon,
  Typography,
} from "@mui/material";
import { Search as SearchIcon } from "../../icons/search";

export const ClientListToolbar = ({ setAnchorEl, handleSearch, searchTerm }) => (
  <Box>
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
        Clients
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button onClick={(e) => setAnchorEl(e.target)} color="primary" variant="contained">
          Add Client
        </Button>
      </Box>
    </Box>
    <Box sx={{ mt: 3 }}>
      <Card>
        <CardContent>
          <Box sx={{ maxWidth: 500 }}>
            <TextField
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SvgIcon color="action" fontSize="small">
                      <SearchIcon />
                    </SvgIcon>
                  </InputAdornment>
                ),
              }}
              placeholder="Search client"
              variant="outlined"
              onChange={(e) => handleSearch(e.target.value)}
              value={searchTerm}
            />
          </Box>
        </CardContent>
      </Card>
    </Box>
  </Box>
);
