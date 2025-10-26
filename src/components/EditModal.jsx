import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useContext, useState } from "react";
import { TodoData } from "../contexts/TodoData";

import { Modals } from "../contexts/ModalsProvider";
import { Snacks } from "../contexts/SnacksProvider";

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

const formStyle = { paddingBottom: "10px" };
const InputFontSize = { fontSize: "20px" };

export default function EditModal() {
  const { todolist, setTodolist } = useContext(TodoData);

  const { editModalOpen, setEditModalOpen, selectedModalTodo } = useContext(Modals);
  const { setSnackBarOpen, setSnackMessage } = useContext(Snacks);

  const [formData, setFormData] = useState(selectedModalTodo);
  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    let todolistCpy = todolist.map((item) => {
      if (item.id === selectedModalTodo.id) {
        item.title = formData.title;
        item.note = formData.note;
      }
      return item;
    });
    setTodolist(todolistCpy);
    localStorage.setItem("todolist", JSON.stringify(todolistCpy));

    setSnackMessage("تم التعديل بنجاح");
    setSnackBarOpen(true);
    setEditModalOpen(false);
  }
  function onClose() {
    setEditModalOpen(false);
  }
  return (
    <Modal open={editModalOpen} onClose={onClose} aria-labelledby="modal-edit-todo">
      <Box sx={modalStyle}>
        <h1 id="modal-title" style={{ fontSize: "30px", fontWeight: "bold" }}>
          تعديل المهمة
        </h1>
        <form>
          <FormControl variant="standard" fullWidth sx={formStyle} color="secondary">
            <InputLabel htmlFor="component-simple" sx={InputFontSize}>
              العنوان
            </InputLabel>
            <Input name="title" id="title" value={formData.title} onChange={onChange} sx={InputFontSize} />
          </FormControl>
          <br />
          <FormControl variant="standard" fullWidth sx={formStyle} color="secondary">
            <InputLabel htmlFor="component-simple" sx={InputFontSize}>
              التفاصيل
            </InputLabel>
            <Input name="note" id="note" value={formData.note} onChange={onChange} sx={InputFontSize} />
          </FormControl>
          <div style={{ direction: "ltr" }}>
            <Button variant="text" sx={InputFontSize} color="secondary" onClick={onSubmit}>
              تعديل
            </Button>
            <Button variant="text" size="large" sx={InputFontSize} color="secondary" onClick={onClose}>
              الغاء
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
}
