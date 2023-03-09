import React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import DescriptionIcon from '@mui/icons-material/Description';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import {
  useRestriction,
} from '../../common/util/permissions';

const MenuItem = ({
  title, link, icon,
}) => (
  <Button href={link} startIcon={icon}>
    {title}
  </Button>
);

const DashboardMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const socket = useSelector((state) => state.session.socket);

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <Button>Test</Button>
      <MenuItem
        title={t('mapTitle')}
        link="/"
        icon={<MapIcon />}
        invisible={socket !== false}
        selected={location.pathname === '/'}
      />
      {!disableReports && (
      <MenuItem
        title={t('reportTitle')}
        link="/reports/route"
        icon={<DescriptionIcon />}
        selected={location.pathname === '/reports/route'}
      />
      )}
      <MenuItem
        title={t('settingsTitle')}
        link="/settings/preferences"
        icon={<SettingsIcon />}
        selected={location.pathname === '/settings/preferences'}
      />
      {readonly ? (
        <MenuItem
          title={t('settingsUser')}
          link="/reports/route"
          icon={<SettingsIcon />}
          selected={location.pathname === '/reports/route'}
        />
      ) : (
        <MenuItem
          title={t('loginLogout')}
          link="/reports/route"
          icon={<SettingsIcon />}
          selected={location.pathname === '/reports/route'}
        />
      )}
    </Box>
  );
};

export default DashboardMenu;
