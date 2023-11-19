import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import makeStyles from '@mui/styles/makeStyles';
// import { FixedSizeList } from 'react-window';
import { VariableSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import DeviceRow from './DeviceRow';
import { devicesActions } from '../store';
import { useEffectAsync } from '../reactHelper';

const ROW_HEIGHT = 50;

const useStyles = makeStyles(() => ({
  list: {
    maxHeight: '100%',
  },
  listInner: {
    position: 'relative',
  },
}));

const DeviceGroupRow = (props) => {
  const { index, data } = props;
  const { items, openRows, toggleOpenRow } = data;
  const rowData = items[index];
  const isOpen = openRows.includes(index);
  const headerLabel = `${rowData.label} (${rowData.items.length})`;
  return (
    <>
      <ListItemButton onClick={() => toggleOpenRow(index)} key={index}>
        <ListItemText primary={headerLabel} />
        {isOpen ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      {isOpen &&
        rowData.items.map((item) => (
          <DeviceRow key={item.id} item={item} />
        ))}
    </>
  );
};

const DeviceList = ({ devices, groups }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const listInnerEl = useRef(null);
  const listRef = useRef(null);
  const [groupedDevices, setGroupedDevices] = useState([]);

  if (listInnerEl.current) {
    listInnerEl.current.className = classes.listInner;
  }

  const [, setTime] = useState(Date.now());

  useEffect(() => {
    const interval = setInterval(() => setTime(Date.now()), 60000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  const [openRows, setOpenRows] = useState([]);
  const toggleOpenRow = (index) => {
    if (openRows.includes(index)) {
      const updatedRows = openRows.filter((i) => i !== index);
      setOpenRows(updatedRows);
    } else {
      setOpenRows([...openRows, index]);
    }
    if (listRef) {
      listRef.current.resetAfterIndex(0);
    }
  };

  useEffect(() => {
    const groupDeviceObj = Object.groupBy(devices, (device) => device.groupId);

    const groupedDeviceArray = [];
    Object.keys(groupDeviceObj).forEach((groupId) => {
      const group = groups[groupId];
      groupedDeviceArray.push({ label: group ? group.name : 'Ungrouped', items: groupDeviceObj[groupId] });
    });
    setGroupedDevices(groupedDeviceArray);
  }, [devices]);

  useEffectAsync(async () => {
    const response = await fetch('/api/devices');
    if (response.ok) {
      dispatch(devicesActions.refresh(await response.json()));
    } else {
      throw Error(await response.text());
    }
  }, []);

  return (
    <AutoSizer className={classes.list}>
      {({ height, width }) => (
        <List
          width={width}
          height={height}
          ref={listRef}
          itemCount={groupedDevices.length}
          itemData={{
            items: groupedDevices,
            openRows,
            toggleOpenRow,
          }}
          itemSize={(index) => {
            if (openRows.includes(index)) {
              // the height of an open group is its content + the header
              return (groupedDevices[index].items.length + 1) * ROW_HEIGHT;
            }
            return ROW_HEIGHT;
          }}
          overscanCount={10}
        >
          {DeviceGroupRow}
        </List>
      )}
    </AutoSizer>
  );
};

export default DeviceList;
