import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";

import { useTodoData } from "../contexts/TodoDataProvider";

import { useModals } from "../contexts/ModalsProvider";
import { useSnacks } from "../contexts/SnacksProvider";

export default function Buttonlist({ todo }) {
  const { todolist, dispatch } = useTodoData();

  const { setEditModalOpen, setDeleteModalOpen, setSelectedModalTodo } = useModals();
  const { setSnackBarOpen, setSnackMessage } = useSnacks();

  let style = {
    border: "2px solid",
    backgroundColor: "white",
    transition: "1s",
    "&:hover": { backgroundColor: "#c9c1c1" },
  };

  function doneHandle() {
    dispatch({ type: "done", payload: { selectedTodo: todo } });

    if (todo.isCompleted) setSnackMessage("تم التراجع عن الاكمال");
    else setSnackMessage("تم الاكمال بنجاح");

    setSnackBarOpen(true);
  }
  function editHandle() {
    setSelectedModalTodo(todo);
    setEditModalOpen(true);
  }
  function deleteHandle() {
    setSelectedModalTodo(todo);
    setDeleteModalOpen(true);
  }

  function doneButtonColor() {
    if (todo.isCompleted) {
      return { backgroundColor: "green", color: "white", borderColor: "green" };
    } else return { color: "success.main" };
  }

  return (
    <Stack direction="row" spacing={2} sx={{ width: 100 }}>
      <IconButton aria-label="delete" sx={style} color="error" onClick={deleteHandle}>
        <DeleteOutlineRoundedIcon />
      </IconButton>
      <IconButton aria-label="edit" sx={style} color="primary" onClick={editHandle}>
        <ModeEditOutlineOutlinedIcon />
      </IconButton>
      <IconButton aria-label="done" className="IconButton" sx={{ ...style, ...doneButtonColor() }} onClick={doneHandle}>
        <CheckOutlinedIcon />
      </IconButton>
    </Stack>
  );
}
