import { Stack } from "@mui/material";
import { useContext } from "react";
import { TodoData } from "../contexts/TodoData";
import Todo from "../components/Todo";
export default function NotCompleted() {
  const { todolist } = useContext(TodoData);
  const todoDisp = todolist.map((item) => {
    if (item.isCompleted == false) {
      return <Todo key={item.id} todo={item} />;
    }
  });
  return <Stack spacing={5}>{todoDisp}</Stack>;
}
