import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#93291E",
    },
    secondary: {
      main: "#FFFFFF",
    },
    text: {
      primary: "#000000",
      secondary: "#79797B",
    },
    background: {
      default: "#1A1A1D",
    },
  },
  overrides: {
    // MuiTableCell: {
    //     root: {
    //         margin: '0px 4% 0px 200px',
    //     },
    // },
  },
});
