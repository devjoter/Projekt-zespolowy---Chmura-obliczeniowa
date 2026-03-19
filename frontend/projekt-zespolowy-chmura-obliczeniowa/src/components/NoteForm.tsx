import { Button, Input, Select } from "antd";
import { useState } from "react";
import { Priority } from "../utils/types";
import { useNotes } from "../hooks/useNotes";
import Text from "antd/es/typography/Text";
import styles from "./NoteForm.module.css";

export default function NoteForm() {
  const { addNote, isAdding } = useNotes();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [priority, setPriority] = useState(Priority.Low);

  const handleSubmit = async () => {
    await addNote({ title, content, priority });
    setTitle("");
    setContent("");
    setPriority(Priority.Low);
  };

  return (
    <div className={styles.form}>
      <Input placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
      <Input.TextArea
        placeholder="Content of the note..."
        onChange={(e) => setContent(e.target.value)}
      />
      <div className={styles.prioritySection}>
        <Text>Priority</Text>
        <Select
          className={styles.prioritySelect}
          value={priority}
          onChange={setPriority}
          options={Object.keys(Priority)
            .filter((k) => isNaN(Number(k)))
            .map((key) => ({
              label: key,
              value: Priority[key as keyof typeof Priority],
            }))}
        />
        <Button type="primary" onClick={handleSubmit} loading={isAdding}>
          Add Note
        </Button>
      </div>
    </div>
  );
}
