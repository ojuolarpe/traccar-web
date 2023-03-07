import React from 'react';
import {
  PieChart, Pie, Cell, Legend, Tooltip,
} from 'recharts';
import {
  Card, CardContent, CardHeader, Grid,
} from '@mui/material';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import StatisticsCard from './StatisticsCard';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <h5 className="label">{`${payload[0].name} : ${payload[0].value}%`}</h5>
      </div>
    );
  }

  return null;
};

const DeviceStatusChart = (props) => {
  const COLORS = ['#4caf50', '#bdbdbd', '#d32f2f'];
  const BGCOLORS = ['secondary.main', '', 'error.main'];
  const { data, title, sx } = props;

  return (
    <Grid item container spacing={3}>
      <Grid
        item
        xs={12}
        lg={8}
      >
        <Card sx={sx}>
          <CardHeader title={title} />
          <CardContent>
            <PieChart width={100%} height={300}>
              <Pie
                data={data}
                color="#000000"
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={120}
                fill="#8884d8"
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${entry}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
              <Legend />
            </PieChart>
          </CardContent>
        </Card>
      </Grid>
      <Grid
        xs={12}
        lg={4}
        spacing={3}
        item
        container
      >
        {data.map((data, index) => (
          <Grid
            xs={12}
            lg={12}
            item
          >
            <StatisticsCard title={data.name} value={data.count} percent={data.value} sx={{ height: '100%' }} icon={<DriveEtaIcon />} backgroundColor={BGCOLORS[index % BGCOLORS.length]} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default DeviceStatusChart;
