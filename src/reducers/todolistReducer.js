export default function todoReducer(currentTodolist, action) {
  const { type, payload } = action;
  let todolistCpy;
  switch (type) {
    case "initial":
      if (localStorage.getItem("todolist") === null) {
        localStorage.setItem("todolist", JSON.stringify(payload.initialTodolist));
        return payload.initialTodolist;
      } else {
        const storageTodos = JSON.parse(localStorage.getItem("todolist"));
        return storageTodos;
      }
      break;
    case "add":
      if (payload.inputTitle) {
        const newTodo = { id: currentTodolist.length + 1, title: payload.inputTitle, note: "", isCompleted: false };

        const newTodosList = [...currentTodolist, newTodo];
        localStorage.setItem("todolist", JSON.stringify(newTodosList));
        return newTodosList;
      }
      break;
    case "done":
      todolistCpy = currentTodolist.map((item) => {
        if (item.id === payload.selectedTodo.id) {
          return { ...item, isCompleted: !item.isCompleted };
        }
        return item;
      });
      localStorage.setItem("todolist", JSON.stringify(todolistCpy));
      return todolistCpy;
    case "update":
      todolistCpy = currentTodolist.map((item) => {
        if (item.id === payload.selectedTodo.id) {
          item.title = payload.formData.title;
          item.note = payload.formData.note;
        }
        return item;
      });
      localStorage.setItem("todolist", JSON.stringify(todolistCpy));
      return todolistCpy;
    case "delete":
      todolistCpy = currentTodolist.filter((todo) => {
        if (todo.id !== payload.selectedTodo.id) return todo;
      });
      localStorage.setItem("todolist", JSON.stringify(todolistCpy));
      return todolistCpy;
    default:
      throw new Error("Unknown Action " + action.type);
  }
  return [];
}
