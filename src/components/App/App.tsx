import { useState } from "react";
import {
  keepPreviousData,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";
import {
  fetchNotes,
  createNoteAPI,
  noteDeleteAPI,
} from "../../services/noteService.ts";
import NoteList from "../NoteList/NoteList.tsx";
import Pagination from "../Pagination/Pagination.tsx";
import Loader from "../Loader/Loader.tsx";
import ErrorMessage from "../ErrorMessage/ErrorMessage.tsx";
import { useDebouncedCallback } from "use-debounce";
import type { NewNote } from "../../types/note.ts";
import Modal from "../Modal/Modal.tsx";

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isLoading, isSuccess, isError } = useQuery({
    queryKey: ["note", search, currentPage],
    queryFn: () => fetchNotes(search, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleSearch = useDebouncedCallback((newQuery: string) => {
    setSearch(newQuery);
    setCurrentPage(1);
  }, 1000);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const queryClient = useQueryClient();

  const mutationCreatae = useMutation({
    mutationFn: createNoteAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
      closeModal();
    },
  });

  const handleCreateNote = (note: NewNote) => {
    mutationCreatae.mutate(note);
  };

  const mutationDelete = useMutation({
    mutationFn: noteDeleteAPI,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["note"] });
    },
  });

  const handleNoteDelete = (id: string) => {
    mutationDelete.mutate(id);
  };

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSubmit={handleSearch} />
        {isSuccess && data.totalPages > 1 && (
          <Pagination
            totalPages={data.totalPages}
            page={currentPage}
            setPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
        {isModalOpen && (
          <Modal onClose={closeModal} onSubmit={handleCreateNote} />
        )}
      </header>
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}
      {data && data.notes.length > 0 && (
        <NoteList notes={data.notes} onClick={handleNoteDelete} />
      )}
    </div>
  );
}
