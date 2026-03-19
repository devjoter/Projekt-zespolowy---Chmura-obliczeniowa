import { useContext } from "react";
import { NotesContext } from "../store/NotesContext";

export const useNotes = () => useContext(NotesContext);
