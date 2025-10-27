import { Stack } from "@mui/material";
import { useTodoData } from "../contexts/TodoDataProvider";
import Todo from "../components/Todo";
export default function NotCompleted() {
  const { todolist } = useTodoData();
  const todoDisp = todolist.map((item) => {
    if (item.isCompleted == false) {
      return <Todo key={item.id} todo={item} />;
    }
  });
  return <Stack spacing={5}>{todoDisp}</Stack>;
}
