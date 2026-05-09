import axios from "axios";
import type { NewNote, Note } from "../types/note";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

const myToken = import.meta.env.VITE_NOTEHUB_TOKEN;

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
axios.defaults.params = {
  sortBy: "created",
  perPage: 12,
  page: 1,
};

export const fetchNotes = async (
  search: string,
  page: number,
): Promise<FetchNotesResponse> => {
  const { data } = await axios.get<FetchNotesResponse>("/notes", {
    params: { search: String(search), page },
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return data;
};

export const createNoteAPI = async (newNote: NewNote) => {
  const { data } = await axios.post<Note>("/notes", newNote, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return data;
};

export const noteDeleteAPI = async (id: string) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
    headers: { Authorization: `Bearer ${myToken}` },
  });
  return data;
};
