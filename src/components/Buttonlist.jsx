import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useContext, useState } from "react";

import { TodoData } from "../contexts/TodoData";
import CustomSnackbar from "./CustomSnackBar";
import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";

export default function Buttonlist({ todo }) {
  const { todolist, setTodolist } = useContext(TodoData);

  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  let style = {
    border: "2px solid",
    backgroundColor: "white",
    transition: "1s",
    "&:hover": { backgroundColor: "#c9c1c1" },
  };

  function doneHandle() {
    let todolistCpy = todolist.map((item) => {
      if (item.id === todo.id) {
        item.isCompleted = !item.isCompleted;
        if (item.isCompleted) setSnackMessage("تم الاكمال بنجاح");
        else setSnackMessage("تم التراجع عن الاكمال");
      }
      return item;
    });
    setTodolist(todolistCpy);
    localStorage.setItem("todolist", JSON.stringify(todolistCpy));
    setSnackBarOpen(true);
  }
  function editHandle() {
    setEditModalOpen(true);
  }
  function deleteHandle() {
    setDeleteModalOpen(true);
  }

  function handleEditComplete() {
    setSnackMessage("تم التعديل بنجاح");
    setSnackBarOpen(true);
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
      <CustomSnackbar open={snackBarOpen} onClose={() => setSnackBarOpen(false)} message={snackMessage} id={todo.id} />
      {editModalOpen && (
        <EditModal
          open={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          todo={todo}
          handleComplete={handleEditComplete}
        />
      )}
      {deleteModalOpen && <DeleteModal open={deleteModalOpen} onClose={() => setDeleteModalOpen(false)} id={todo.id} />}
    </Stack>
  );
}
