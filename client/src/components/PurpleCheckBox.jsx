import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import { createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

const styles = theme => ({
  root: {
    color: theme.status.color,
    '&$checked': {
      color: theme.status.color,
    },
  },
  checked: {},
});

let NestedCheckbox = props => (
  <Checkbox
    checked={props.checked}
    classes={{
      root: props.classes.root,
      checked: props.classes.checked,
    }}
  />
);

NestedCheckbox = withStyles(styles)(NestedCheckbox);

const theme1 = createMuiTheme({
  status: {
    color: purple[500],
  },
});

function Nested(props) {
  return (
    <MuiThemeProvider theme={theme1}>
      <NestedCheckbox checked={props.checked}/>
    </MuiThemeProvider>
  );
}

export default Nested;