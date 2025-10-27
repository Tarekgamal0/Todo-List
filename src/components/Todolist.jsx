import { Button, Container, Divider, Grid, Modal, TextField } from "@mui/material";
import { Routes, Route } from "react-router";

import { useTodoData } from "../contexts/TodoDataProvider";
import { useEffect, useState } from "react";
import Completed from "../routes/Completed";
import NotCompleted from "../routes/NotCompleted";
import All from "../routes/All";

import CustomNavTabs from "../components/CustomNavTabs";

import CustomSnackbar from "./CustomSnackBar";

import EditModal from "./EditModal";
import DeleteModal from "./DeleteModal";
import { useSnacks } from "../contexts/SnacksProvider";

const initialTodolist = [
  { id: 1, title: "قراءة 3 كتب ", note: "الانجاز قبل نهاية الشهر", isCompleted: false },
  { id: 2, title: "انجاز مشروع قائمة المهام", note: "", isCompleted: true },
  { id: 3, title: "ااانجازنجاز مشروع قائنجاز مشروع قائ مشروع قائمة المهام", note: "", isCompleted: false },
];
export default function Todolist() {
  const [inputTitle, setInputTitle] = useState("");

  const { todolist, dispatch } = useTodoData();
  const { setSnackBarOpen, setSnackMessage } = useSnacks();

  useEffect(() => {
    dispatch({ type: "initial", payload: { initialTodolist } });
  }, []);

  function handleAdd(e) {
    dispatch({ type: "add", payload: { inputTitle } });
    setInputTitle("");
    setSnackMessage("تم الاضافة بنجاح");
    setSnackBarOpen(true);
  }

  return (
    <>
      <Container maxWidth="sm" sx={{ backgroundColor: "white", paddingBottom: 5, width: "600px" }}>
        <h1 style={{ fontSize: 70, textAlign: "center" }}>مهامي</h1>
        <Divider />
        <CustomNavTabs />
        <Routes>
          <Route path="/" element={<NotCompleted />} />
          <Route path="/Completed" element={<Completed />} />
          <Route path="/all" element={<All />} />
        </Routes>
        <Grid container spacing={1} sx={{ marginTop: 3 }}>
          <Grid size={3}>
            <Button
              variant="contained"
              color="error"
              sx={{ width: "100%", height: "100%", fontSize: "20px" }}
              onClick={handleAdd}
              disabled={inputTitle ? false : true}
            >
              اضافة
            </Button>
          </Grid>
          <Grid size={9}>
            <TextField
              id="outlined-required"
              label="عنوان المهمة"
              color="secondary"
              sx={{ width: "100%", fontSize: "30px" }}
              value={inputTitle}
              onChange={(e) => setInputTitle(e.target.value)}
            />
          </Grid>
        </Grid>
      </Container>

      <CustomSnackbar />

      <EditModal />
      <DeleteModal />
    </>
  );
}
