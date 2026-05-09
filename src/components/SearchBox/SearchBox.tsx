import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSubmit: (search: string) => void;
}

export default function SearchBox({ onSubmit }: SearchBoxProps) {
  const handleSearch = (value: string) => {
    if (!value.trim()) {
      return;
    }

    onSubmit(value);
  };

  return (
    <input
      className={css.input}
      type="text"
      name="search"
      autoComplete="off"
      placeholder="Search notes"
      autoFocus
      onChange={(e) => handleSearch(e.target.value)}
    />
  );
}
