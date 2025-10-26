import Snackbar from "@mui/material/Snackbar";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { Alert } from "@mui/material";

// let myStyle = {
//   width: "200px",
//   height: "50px",
//   backgroundColor: "green",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// };
export default function CustomSnackbar({ open, onClose, message }) {
  return (
    <Snackbar
      open={open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
    >
      {/* <Alert style={myStyle}>
        {message} <TaskAltIcon />
      </Alert> */}
      <Alert sx={{ direction: "rtl", paddingX: "20px" }}>{message}</Alert>
    </Snackbar>
  );
}
