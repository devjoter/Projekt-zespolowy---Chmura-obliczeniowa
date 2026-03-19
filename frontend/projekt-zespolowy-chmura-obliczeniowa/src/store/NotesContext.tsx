import { createContext, useEffect, useState } from "react";
import type { Note } from "../utils/types";
import api from "../utils/axios";

interface NotesContextType {
  notes: Note[];
  isLoading: boolean;
  isAdding: boolean;
  fetchNotes: () => void;
  addNote: (note: Partial<Note>) => Promise<void>;
  deleteNote: (id: string) => Promise<void>;
  editNote: (id: string, note: Partial<Note>) => Promise<void>;
}

export const NotesContext = createContext<NotesContextType>(null!);

export const NotesProvider = ({ children }: any) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const fetchNotes = async () => {
    setIsLoading(true);
    try {
      // const res = await api.get("/notes");
      // setNotes(res.data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setNotes([
        {
          id: "1",
          title: "First note",
          content: "This is the content of the first note",
          priority: 0,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "2",
          title: "Second note",
          content: "This is the content of the second note",
          priority: 1,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        {
          id: "3",
          title: "Third note",
          content: "This is the content of the third note",
          priority: 2,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const addNote = async (note: Partial<Note>) => {
    setIsAdding(true);
    try {
      await api.post("/notes", note);
      await fetchNotes();
    } finally {
      setIsAdding(false);
    }
  };

  const deleteNote = async (id: string) => {
    setIsLoading(true);
    try {
      await api.delete(`/notes/${id}`);
      await fetchNotes();
    } finally {
      setIsLoading(false);
    }
  };

  const editNote = async (id: string, note: Partial<Note>) => {
    setIsLoading(true);
    try {
      await api.put(`/notes/${id}`, note);
      await fetchNotes();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  return (
    <NotesContext.Provider
      value={{
        notes,
        isLoading,
        isAdding,
        fetchNotes,
        addNote,
        deleteNote,
        editNote,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};
