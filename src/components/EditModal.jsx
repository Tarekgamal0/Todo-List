import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, Input, InputLabel } from "@mui/material";
import { useEffect, useState } from "react";
import { useTodoData } from "../contexts/TodoDataProvider";

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

const formStyle = { paddingBottom: "10px" };
const InputFontSize = { fontSize: "20px" };

export default function EditModal() {
  const { todolist, dispatch } = useTodoData();

  const { editModalOpen, setEditModalOpen, selectedModalTodo } = useModals();
  const { setSnackBarOpen, setSnackMessage } = useSnacks();

  const [formData, setFormData] = useState({ title: "", note: "" });

  useEffect(() => {
    if (selectedModalTodo) {
      setFormData(selectedModalTodo);
    }
  }, [selectedModalTodo]);

  if (!selectedModalTodo) return null;

  function onChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }
  function onSubmit(e) {
    dispatch({ type: "update", payload: { selectedTodo: selectedModalTodo, formData } });
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
