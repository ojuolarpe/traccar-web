import React from 'react';
import {
  Divider, List, ListItemButton, ListItemIcon, ListItemText,
} from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import MapIcon from '@mui/icons-material/Map';
import CreateIcon from '@mui/icons-material/Create';
import NotificationsIcon from '@mui/icons-material/Notifications';
import FolderIcon from '@mui/icons-material/Folder';
import PersonIcon from '@mui/icons-material/Person';
import StorageIcon from '@mui/icons-material/Storage';
import BuildIcon from '@mui/icons-material/Build';
import PeopleIcon from '@mui/icons-material/People';
import TodayIcon from '@mui/icons-material/Today';
import PublishIcon from '@mui/icons-material/Publish';
import DescriptionIcon from '@mui/icons-material/Description';
import SmartphoneIcon from '@mui/icons-material/Smartphone';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from '../../common/components/LocalizationProvider';
import {
  useAdministrator, useDeviceReadonly, useManager, useRestriction,
} from '../../common/util/permissions';
import useFeatures from '../../common/util/useFeatures';

const MenuItem = ({
  title, link, icon, selected,
}) => (
  <ListItemButton key={link} component={Link} to={link} selected={selected}>
    <ListItemIcon>{icon}</ListItemIcon>
    <ListItemText primary={title} />
  </ListItemButton>
);

const DashboardMenu = () => {
  const t = useTranslation();
  const location = useLocation();

  const readonly = useRestriction('readonly');
  const disableReports = useRestriction('disableReports');
  const deviceReadonly = useDeviceReadonly();
  const admin = useAdministrator();
  const manager = useManager();
  const userId = useSelector((state) => state.session.user.id);
  const socket = useSelector((state) => state.session.socket);

 

  return (
    <List>
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
    </List>
  );
};

export default DashboardMenu;
