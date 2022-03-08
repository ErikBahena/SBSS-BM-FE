import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography,
} from "@mui/material";

import { connect } from "react-redux";
import { getInitials } from "src/utils/get-initials";
import { capitalizeName } from "src/utils/capitalize-name";

const AccountProfile = ({ user }) => (
  <Card>
    <CardContent>
      <Box
        sx={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar
          src={user.photo_url}
          sx={{
            height: 75,
            mb: 2,
            width: 75,
          }}
        >
          {getInitials(`${user.first_name} ${user.last_name}`)}
        </Avatar>
        <Typography color="textPrimary" gutterBottom variant="h5">
          {capitalizeName(`${user.first_name} ${user.last_name}`)}
        </Typography>
        <Typography color="textSecondary" variant="body2">
          {user.address?.city && `${user.address?.city}, ${user.address?.country}`}
        </Typography>
        {/* <Typography color="textSecondary" variant="body2">
          {new Date().getFullYear}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    {/* <CardActions>
      <Button color="primary" fullWidth variant="text">
        Upload picture
      </Button>
    </CardActions> */}
  </Card>
);
const mapStateToProps = (state) => ({
  user: state.user,
});

export default connect(mapStateToProps)(AccountProfile);
