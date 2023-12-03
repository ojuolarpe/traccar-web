import React from 'react';
import {
  TextField, useTheme, useMediaQuery, Paper,
} from '@mui/material';
import makeStyles from '@mui/styles/makeStyles';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import { useTranslation } from '../../common/components/LocalizationProvider';

export const filterByKeyword = (keyword) => (item) => !keyword || JSON.stringify(item).toLowerCase().includes(keyword.toLowerCase());

const useStyles = makeStyles((theme) => ({
  header: {
    position: 'sticky',
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: theme.spacing(3, 2, 2),
  },
}));

const SearchHeader = ({ keyword, setKeyword }) => {
  const theme = useTheme();
  const classes = useStyles();
  const t = useTranslation();

  const phone = useMediaQuery(theme.breakpoints.down('sm'));

  return phone ? (
    <div className={classes.header}>
      <TextField
        variant="outlined"
        placeholder={t('sharedSearch')}
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
    </div>
  ) : (
    <Paper elevation={2} variant="outlined">
      <div className={classes.header}>
        <TextField
          variant="outlined"
          placeholder={t('sharedSearch')}
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                {keyword ? (<ClearIcon style={{ cursor: 'pointer' }} onClick={() => setKeyword('')} />) : ''}
              </InputAdornment>
            ),
          }}
        />
      </div>
    </Paper>
  );
};

export default SearchHeader;
