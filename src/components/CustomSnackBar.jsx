import Snackbar from "@mui/material/Snackbar";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Alert } from "@mui/material";
import { useSnacks } from "../contexts/SnacksProvider";

// let myStyle = {
//   width: "200px",
//   height: "50px",
//   backgroundColor: "green",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };
export default function CustomSnackbar() {
  const { snackBarOpen, setSnackBarOpen, snackMessage } = useSnacks();
  return (
    <Snackbar
      open={snackBarOpen}
      onClose={() => setSnackBarOpen(false)}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      {/* <Alert style={myStyle}>
        {message} <TaskAltIcon />
      </Alert> */}
      <Alert sx={{ direction: "rtl", paddingX: "20px" }}>{snackMessage}</Alert>
    </Snackbar>
  );
}
