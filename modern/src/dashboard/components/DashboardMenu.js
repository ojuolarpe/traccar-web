import React from 'react';
import {
  Box,
  Button,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import DescriptionIcon from '@mui/icons-material/Description';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { useTranslation } from '../../common/components/LocalizationProvider';
import {
  useRestriction, useDeviceReadonly,
} from '../../common/util/permissions';
import { nativePostMessage } from '../../common/components/NativeInterface';
import { sessionActions } from '../../store';

const MenuItem = ({
  title, link, icon,
}) => (
  <Button href={link} startIcon={icon} color="secondary" variant="contained">
    {title}
  </Button>
);

const DashboardMenu = () => {
  const t = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const readonly = useRestriction('readonly');

  const deviceReadonly = useDeviceReadonly();
  const disableReports = useRestriction('disableReports');
  const socket = useSelector((state) => state.session.socket);
  const user = useSelector((state) => state.session.user);

  const handleAccount = () => {
    navigate(`/settings/user/${user.id}`);
  };

  const handleLogout = async () => {
    const notificationToken = window.localStorage.getItem('notificationToken');
    if (notificationToken) {
      window.localStorage.removeItem('notificationToken');
      const tokens = user.attributes.notificationTokens?.split(',') || [];
      if (tokens.includes(notificationToken)) {
        const updatedUser = {
          ...user,
          attributes: {
            ...user.attributes,
            notificationTokens: tokens.length > 1 ? tokens.filter((it) => it !== notificationToken).join(',') : undefined,
          },
        };
        await fetch(`/api/users/${user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updatedUser),
        });
      }
    }

    await fetch('/api/session', { method: 'DELETE' });
    nativePostMessage('logout');
    navigate('/login');
    dispatch(sessionActions.updateUser(null));
  };

  return (
    <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
      <MenuItem
        title={t('mapTitle')}
        link="/"
        icon={<MapIcon />}
        invisible={socket !== false}
        selected={location.pathname === '/'}
      />
      {!deviceReadonly && (
      <MenuItem
        title={t('deviceTitle')}
        link="/settings/devices"
        icon={<SmartphoneIcon />}
        selected={location.pathname.startsWith('/settings/device')}
      />
      )}
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
        <Button
          onClick={handleLogout}
          startIcon={<LogoutIcon />}
        >
          {t('loginLogout')}
        </Button>
      ) : (
        <>
          <Button
            onClick={handleAccount}
            color="secondary"
            variant="contained"
            startIcon={<PersonIcon />}
          >
            {t('settingsUser')}
          </Button>
          <Button
            onClick={handleLogout}
            color="secondary"
            variant="contained"
            startIcon={<LogoutIcon />}
          >
            {t('loginLogout')}
          </Button>

        </>
      )}
    </Box>
  );
};

export default DashboardMenu;
