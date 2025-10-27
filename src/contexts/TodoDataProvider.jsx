import { createContext, useContext, useReducer } from "react";
import todoReducer from "../reducers/todolistReducer";

const TodoData = createContext({});

export default function TodoDataProvider({ children }) {
  const [todolist, dispatch] = useReducer(todoReducer, []);
  return <TodoData.Provider value={{ todolist, dispatch }}>{children}</TodoData.Provider>;
}

export const useTodoData = () => {
  return useContext(TodoData);
};
