import React from 'react';
import {
  Avatar, Card, CardContent, Stack, Typography,
} from '@mui/material';
import TodayIcon from '@mui/icons-material/Today';

const StatisticsCard = (props) => {
  const { sx, value, title, icon, backgroundColor = 'secondary', percent = undefined } = props;

  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography
              color="text.secondary"
              variant="overline"
            >
              {title}
            </Typography>
            <Typography variant="h4">
              {value}
            </Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor,
              height: 56,
              width: 56,
            }}
          >
            {icon || <TodayIcon />}
          </Avatar>
        </Stack>
        {percent !== undefined && (
        <Stack>
          <Typography
            variant="body2"
          >
            {percent}
            %
          </Typography>
        </Stack>
        )}

      </CardContent>
    </Card>
  );
};

export default StatisticsCard;
