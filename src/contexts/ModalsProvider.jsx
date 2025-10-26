import { createContext, useState } from "react";

export const Modals = createContext({});

export default function ModalsProvider({ children }) {
  const [selectedModalTodo, setSelectedModalTodo] = useState(null);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <Modals.Provider
      value={{
        editModalOpen,
        setEditModalOpen,
        deleteModalOpen,
        setDeleteModalOpen,
        selectedModalTodo,
        setSelectedModalTodo,
      }}
    >
      {children}
    </Modals.Provider>
  );
}
