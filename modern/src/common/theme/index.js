import { createTheme } from '@mui/material/styles';
import palette from './palette';
import dimensions from './dimensions';
import components from './components';
import typography from './typography';

const theme = createTheme({
  palette,
  dimensions,
  components,
  typography,
});

export default theme;
