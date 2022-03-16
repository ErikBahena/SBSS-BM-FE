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
import { capitalizeFirstLetter } from "src/utils/letter-utils";
import { Search as SearchIcon } from "../../icons/search";

export const ListToolbar = ({ setAnchorEl, handleSearch, searchTerm, type }) => (
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
        {capitalizeFirstLetter(type)}s
      </Typography>
      <Box sx={{ m: 1 }}>
        <Button onClick={(e) => setAnchorEl(e.target)} color="primary" variant="contained">
          Add {capitalizeFirstLetter(type)}
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
              placeholder={`Search ${type}`}
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
