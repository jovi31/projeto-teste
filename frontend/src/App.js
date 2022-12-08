import React from "react";
import { ThemeProvider, createTheme } from "@material-ui/core/styles";
import "./App.css";
import RoutesHandler from "./routes";

const theme = createTheme({
  palette: {
    primary: {
      main: "#00a",
      contrastText: "#ffffff",
    },
  },
});

export default function App() {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <RoutesHandler />
      </ThemeProvider>
    </React.Fragment>
  );
}
