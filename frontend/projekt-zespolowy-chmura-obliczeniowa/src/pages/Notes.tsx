import {
  Typography,
  Card,
  List,
  Space,
  Input,
  Select,
  Button,
  Spin,
} from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import Navbar from "../components/Navbar";
import { useNotes } from "../hooks/useNotes";
import { PriorityName, PriorityType } from "../utils/mappings";
import { useTheme } from "../store/ThemeContext";
import { useState, useEffect } from "react";
import { type Note, Priority } from "../utils/types";
import NoteForm from "../components/NoteForm";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./Notes.module.css";

const { Text } = Typography;

export default function Notes() {
  const { theme } = useTheme();
  const { notes, isLoading, fetchNotes, addNote, deleteNote, editNote } =
    useNotes();
  const [editingNote, setEditingNote] = useState<Note | null>(null);

  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");
  const [editPriority, setEditPriority] = useState<Priority>(Priority.Low);

  const [deletingIds, setDeletingIds] = useState<Set<string>>(new Set());
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    if (editingNote) {
      setEditTitle(editingNote.title);
      setEditContent(editingNote.content);
      setEditPriority(editingNote.priority);
    }
  }, [editingNote]);

  const handleDelete = async (id: string) => {
    setDeletingIds((prev) => new Set(prev).add(id));
    try {
      await deleteNote(id);
    } finally {
      setDeletingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(id);
        return newSet;
      });
    }
  };

  const handleEdit = (note: Note) => {
    setEditingNote(note);
  };

  const handleCancelEdit = () => setEditingNote(null);

  const handleSaveEdit = async () => {
    if (!editingNote) return;
    setEditingId(editingNote.id);
    try {
      await editNote(editingNote.id, {
        title: editTitle,
        content: editContent,
        priority: editPriority,
      });
      setEditingNote(null);
    } finally {
      setEditingId(null);
    }
  };

  return (
    <div
      className={styles.container}
      style={{ background: theme.backgroundColor }}
    >
      <Navbar />
      <div className={styles.content}>
        <NoteForm />

        <List
          grid={{ gutter: 16, column: 1 }}
          dataSource={notes}
          loading={isLoading}
          renderItem={(note) => {
            const isEditing = editingNote?.id === note.id;
            return (
              <List.Item>
                <Card
                  title={
                    <div className={styles.titleContainer}>
                      {isEditing && (
                        <Text
                          type="secondary"
                          className={styles.editingText}
                          style={{ color: theme.primaryColor }}
                        >
                          Editing
                        </Text>
                      )}
                      {note.title}
                    </div>
                  }
                  extra={
                    <Space className={styles.extraSpace}>
                      <Text strong type={PriorityType[note.priority]}>
                        {PriorityName[note.priority]}
                      </Text>
                      {editingId === note.id ? (
                        <Spin size="small">
                          <EditOutlined className={styles.editIcon} />
                        </Spin>
                      ) : (
                        <EditOutlined
                          className={styles.editIcon}
                          onClick={() => handleEdit(note)}
                        />
                      )}
                      {deletingIds.has(note.id) ? (
                        <Spin size="small">
                          <DeleteOutlined className={styles.deleteIcon} />
                        </Spin>
                      ) : (
                        <DeleteOutlined
                          className={styles.deleteIcon}
                          onClick={() => handleDelete(note.id)}
                        />
                      )}
                    </Space>
                  }
                  className={`${styles.card} ${isEditing ? styles.cardEditing : ""}`}
                >
                  {note.content}
                  <div
                    className={styles.timestamp}
                    style={{ color: theme.borderColor }}
                  >
                    Created: {new Date(note.createdAt).toLocaleString()} |
                    Updated: {new Date(note.updatedAt).toLocaleString()}
                  </div>
                </Card>
              </List.Item>
            );
          }}
        />
      </div>

      {/* Dolny formularz edycji */}
      <AnimatePresence>
        {editingNote && (
          <motion.div
            initial={{ y: 300, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 300, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className={styles.editFormContainer}
          >
            <Card title={`Edit Note`} className={styles.editCard}>
              <Input
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={styles.inputMargin}
              />
              <Input.TextArea
                placeholder="Content"
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={styles.inputMargin}
              />
              <div className={styles.buttonContainer}>
                <Select
                  value={editPriority}
                  onChange={setEditPriority}
                  className={styles.prioritySelect}
                  options={Object.keys(Priority)
                    .filter((k) => isNaN(Number(k)))
                    .map((key) => ({
                      label: key,
                      value: Priority[key as keyof typeof Priority],
                    }))}
                />
                <Space>
                  <Button onClick={handleCancelEdit}>Cancel</Button>
                  <Button
                    type="primary"
                    onClick={handleSaveEdit}
                    loading={editingId !== null}
                  >
                    Save
                  </Button>
                </Space>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
