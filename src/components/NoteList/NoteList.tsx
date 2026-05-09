import type { Note } from "../../types/note";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
  onClick: (id: string) => void;
}

export default function NoteList({ notes, onClick }: NoteListProps) {
  const handleClick = (noteId: string) => {
    onClick(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li key={note.id} className={css.listItem}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <button className={css.button} onClick={() => handleClick(note.id)}>
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
}
