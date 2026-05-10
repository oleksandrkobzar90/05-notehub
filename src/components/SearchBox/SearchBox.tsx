import css from "./SearchBox.module.css";

interface SearchBoxProps {
  onSearch: (search: string) => void;
}

export default function SearchBox({ onSearch }: SearchBoxProps) {
  const handleSearch = (value: string) => {
    if (!value.trim()) {
      return;
    }

    onSearch(value);
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
