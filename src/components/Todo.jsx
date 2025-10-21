import { Stack } from "@mui/material";
import Buttonlist from "./Buttonlist";
import "./Todo.css";

export default function Todo({ todo }) {
  if (todo.note) {
    return (
      <Stack className="todo" direction="row">
        <div style={{ width: "40%" }}>
          <Buttonlist todo={todo} />
        </div>
        <div style={{ width: "60%" }}>
          <h2>{todo.title}</h2>
          <p>{todo.note}</p>
        </div>
      </Stack>
    );
  } else {
    return (
      <Stack className="todo" direction="row">
        <div style={{ width: "40%" }}>
          <Buttonlist todo={todo} />
        </div>
        <div style={{ width: "60%" }}>
          <h2>{todo.title}</h2>
        </div>
      </Stack>
    );
  }
}
