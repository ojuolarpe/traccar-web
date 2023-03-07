import React from 'react';
import { useSelector } from 'react-redux';
import {
  Box, Container, Unstable_Grid2 as Grid, Typography, Divider, AppBar, Toolbar, Button,
} from '@mui/material';
import DirectionsCarFilledTwoToneIcon from '@mui/icons-material/DirectionsCarFilledTwoTone';
import StatisticsCard from './components/StatisticsCard';
import DeviceStatusChart from './components/DeviceStatusChart';

const DashboardPage = () => {
  const devices = Object.values(useSelector((state) => state.devices.items));
  const positions = Object.values(useSelector((state) => state.session.positions));
  const [movingCount, setMovingCount] = React.useState(0);
  const [idleCount, setIdleCount] = React.useState(0);
  const [stoppedCount, setStoppedCount] = React.useState(0);
  const [, setOfflineCount] = React.useState(0);
  const [, setInactiveCount] = React.useState(0);
  const [neverActiveCount, setNeverActiveCount] = React.useState(0);
  const [deviceStatusPieChartData, setDeviceStatusPieChartData] = React.useState([{ name: 'online', value: 0, count: 0 }, { name: 'offline', value: 0, count: 0 }, { name: 'Inactive', value: 0, count: 0 }]);

  const getMotionValue = (position) => (position.attributes && position.attributes.motion ? position.attributes.motion : false);
  const getIgnitionValue = (position) => (position.attributes && position.attributes.ignition ? position.attributes.ignition : false);

  React.useEffect(() => {
    setMovingCount(positions ? positions.filter((position) => getMotionValue(position)).length : 0);
    setIdleCount(positions ? positions.filter((position) => (getIgnitionValue(position) && !getMotionValue(position))).length : 0);
    setStoppedCount(positions ? positions.filter((position) => (!getIgnitionValue(position) && !getMotionValue(position))).length : 0);
  }, [positions]);

  React.useEffect(() => {
    const totalDevice = devices ? devices.length : 0;
    const totalOffline = devices ? devices.filter((device) => device.status === 'offline').length : 0;
    const totalOnline = devices ? devices.filter((device) => device.status === 'online').length : 0;
    const totalUnknown = devices ? devices.filter((device) => device.status === 'unknown').length : 0;
    setOfflineCount(totalOffline);
    setInactiveCount(totalUnknown);
    setNeverActiveCount(devices ? devices.filter((device) => device.lastUpdate === null).length : 0);
    setDeviceStatusPieChartData([{ name: 'Online', value: ((totalOnline) / totalDevice) * 100, count: totalOnline }, { name: 'Inactive', value: ((totalUnknown) / totalDevice) * 100, count: totalUnknown }, { name: 'Offline', value: (totalOffline / totalDevice) * 100, count: totalOffline }]);
  }, [devices]);
  const navItems = ['Home', 'About', 'Contact'];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'block', sm: 'block' } }}
          >
            EFCC TELEMATICS CORE
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {navItems.map((item) => (
              <Button key={item} sx={{ color: '#fff' }}>
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 12,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            spacing={3}
          >
            <Typography
              color="text.secondary"
              variant="h4"
              mb={2}
              ml={1}
            >
              Dashboard
            </Typography>
          </Grid>
          <Divider />
          <Grid
            container
            spacing={3}
            mt={1}
          >
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatisticsCard title="Moving" value={movingCount} sx={{ height: '100%' }} icon={<DirectionsCarFilledTwoToneIcon />} backgroundColor="secondary.main" />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatisticsCard title="Idle" value={idleCount} sx={{ height: '100%' }} icon={<DirectionsCarFilledTwoToneIcon />} backgroundColor="warning.main" />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatisticsCard title="Stopped" value={stoppedCount} sx={{ height: '100%' }} icon={<DirectionsCarFilledTwoToneIcon />} backgroundColor="primary.light" />
            </Grid>
            <Grid
              xs={12}
              sm={6}
              lg={3}
            >
              <StatisticsCard title="Never Connected" value={neverActiveCount} sx={{ height: '100%' }} icon={<DirectionsCarFilledTwoToneIcon />} backgroundColor="info.light" />
            </Grid>
            <Grid
              xs={12}
              lg={12}
            >
              <DeviceStatusChart title="Devices" data={deviceStatusPieChartData} sx={{ height: '100%' }} />
            </Grid>
          </Grid>

        </Container>
      </Box>
    </Box>
  );
};

export default DashboardPage;
