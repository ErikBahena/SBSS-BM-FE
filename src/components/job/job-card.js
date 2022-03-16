import React from "react";

import { format } from "date-fns";
import { getInitials, capitalizeName } from "../../utils";

import { Box, Grid, Card, Typography, Avatar, CardContent, Divider } from "@mui/material";

import EventIcon from "@mui/icons-material/Event";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LocalPhoneOutlinedIcon from "@mui/icons-material/LocalPhoneOutlined";

export const JobCard = ({ job }) => {
  return (
    <Card sx={{ maxWidth: "600px", px: 2, py: 2 }}>
      <CardContent>
        <Box>
          <Typography sx={{ mb: 0.8 }} variant="h6">
            {capitalizeName(job.title)}
          </Typography>

          <Box display="flex" alignItems="center">
            <EventIcon sx={{ mr: 0.8 }} />
            <Typography variant="subtitle1">
              {format(new Date(job.created_at), "MM/dd/yyyy")}
            </Typography>
          </Box>
        </Box>

        <Grid container>
          <Grid item xs={12} sx={{ mt: 1 }}>
            <Typography variant="overline" sx={{ color: "rgba(0, 0, 0, 0.5)" }}>
              Client
            </Typography>
            <Box display="flex" alignItems="center">
              <Avatar sx={{ mr: 1.5 }}>
                {getInitials(`${job.client.first_name} ${job.client.last_name}`)}
              </Avatar>

              <Box>
                <Typography sx={{ pt: 1, mb: 0.3 }} variant="h6">
                  {capitalizeName(`${job.client.first_name} ${job.client.last_name}`)}
                </Typography>
                <Box display="flex">
                  <EmailOutlinedIcon sx={{ mr: 1 }} />
                  <Typography variant="body1">{job.client.email}</Typography>

                  <LocalPhoneOutlinedIcon sx={{ mx: 1 }} />
                  <Typography variant="body1">{job.client.phone}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
