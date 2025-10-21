import { Button, Container, Divider, Grid, TextField } from "@mui/material";
import { Routes, Route } from "react-router";

import { TodoData } from "../contexts/TodoData";
import { useEffect, useState } from "react";
import Completed from "../routes/Completed";
import NotCompleted from "../routes/NotCompleted";
import All from "../routes/all";

import CustomNavTabs from "../components/CustomNavTabs";

const initialTodolist = [
  { id: 1, title: "قراءة 3 كتب ", note: "الانجاز قبل نهاية الشهر", isCompleted: false },
  { id: 2, title: "انجاز مشروع قائمة المهام", note: "", isCompleted: true },
  { id: 3, title: "ااانجازنجاز مشروع قائنجاز مشروع قائ مشروع قائمة المهام", note: "", isCompleted: false },
];
export default function Todolist() {
  const [todolist, setTodolist] = useState([]);

  useEffect(() => {
    if (localStorage.getItem("todolist") === null) {
      localStorage.setItem("todolist", JSON.stringify(initialTodolist));
      setTodolist(initialTodolist);
    } else {
      const storageTodos = JSON.parse(localStorage.getItem("todolist"));
      setTodolist(storageTodos);
    }
  }, []);

  const [inputTitle, setInputTitle] = useState("");
  function handleAdd(e) {
    if (inputTitle) {
      const newTodo = { id: todolist.length + 1, title: inputTitle, note: "", isCompleted: false };

      const newTodosList = [...todolist, newTodo];
      setTodolist(newTodosList);
      localStorage.setItem("todolist", JSON.stringify(newTodosList));

      setInputTitle("");
    }
  }

  return (
    <TodoData.Provider value={{ todolist, setTodolist }}>
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
    </TodoData.Provider>
  );
}
