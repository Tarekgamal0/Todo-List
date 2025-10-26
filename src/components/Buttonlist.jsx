import { Box, IconButton, Modal, Stack, Typography } from "@mui/material";
import DeleteOutlineRoundedIcon from "@mui/icons-material/DeleteOutlineRounded";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { useContext, useState } from "react";

import { TodoData } from "../contexts/TodoData";

import { Modals } from "../contexts/ModalsProvider";
import { Snacks } from "../contexts/SnacksProvider";

export default function Buttonlist({ todo }) {
  const { todolist, setTodolist } = useContext(TodoData);

  const { setEditModalOpen, setDeleteModalOpen, setSelectedModalTodo } = useContext(Modals);
  const { setSnackBarOpen, setSnackMessage } = useContext(Snacks);

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
