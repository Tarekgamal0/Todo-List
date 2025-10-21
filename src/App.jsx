import "./App.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Todolist from "./components/Todolist";

const theme = createTheme({
  palette: {
    // primary: {
    //   main: red[900],
    // },
    // secondary: {
    //   main: green[500],
    // },
  },
  typography: {
    fontFamily: ["ALight"],
  },
});
const appStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "black",
  height: "100vh",
  fontFamily: "ALight",
  // direction: "rtl",
};
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <div style={appStyle}>
          <Todolist />
        </div>
      </ThemeProvider>
    </>
  );
}

export default App;
