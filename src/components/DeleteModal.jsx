import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useContext, useState } from "react";
import { TodoData } from "../contexts/TodoData";

import { useModals } from "../contexts/ModalsProvider";
import { useSnacks } from "../contexts/SnacksProvider";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 2,
  direction: "rtl",
  fontSize: "30px",
};

const InputFontSize = { fontSize: "20px" };

export default function DeleteModal() {
  const { todolist, setTodolist } = useContext(TodoData);

  const { deleteModalOpen, setDeleteModalOpen, selectedModalTodo } = useModals();
  const { setSnackBarOpen, setSnackMessage } = useSnacks();

  function onSubmit(e) {
    if (!selectedModalTodo) return;

    let todolistCpy = todolist.filter((todo) => {
      if (todo.id !== selectedModalTodo.id) return todo;
    });
    setTodolist(todolistCpy);
    localStorage.setItem("todolist", JSON.stringify(todolistCpy));

    setSnackMessage("تم الحذف بنجاح");
    setSnackBarOpen(true);

    setDeleteModalOpen(false);
  }
  function onClose() {
    setDeleteModalOpen(false);
  }
  return (
    <Modal open={deleteModalOpen} onClose={onClose} aria-labelledby="modal-edit-todo">
      <Box sx={modalStyle}>
        <h1 id="modal-title" style={{ fontSize: "20px", fontWeight: "bold" }}>
          هل انت متاكد من الحذف ؟
        </h1>
        <p id="modal-title" style={{ fontSize: "20px", color: "gray" }}>
          لا يمكن التراجع عن الحذف في حال الاختيار زر حذف
        </p>

        <div style={{ direction: "ltr" }}>
          <Button variant="text" sx={InputFontSize} color="secondary" onClick={onSubmit}>
            نعم قم بالحذف
          </Button>
          <Button variant="text" size="large" sx={InputFontSize} color="secondary" onClick={onClose}>
            اغلاق
          </Button>
        </div>
      </Box>
    </Modal>
  );
}
