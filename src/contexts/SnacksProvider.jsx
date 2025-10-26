import { createContext, useContext, useState } from "react";

export const Snacks = createContext({});

export default function SnacksProvider({ children }) {
  const [snackBarOpen, setSnackBarOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  return (
    <Snacks.Provider value={{ snackBarOpen, setSnackBarOpen, snackMessage, setSnackMessage }}>
      {children}
    </Snacks.Provider>
  );
}

export const useSnacks = () => {
  return useContext(Snacks);
};
