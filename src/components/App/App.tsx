import SearchBox from "../SearchBox/SearchBox";
import css from "./App.module.css";

export default function App() {
  <div className={css.app}>
    <header className={css.toolbar}>
      <SearchBox />
      {isSuccess && totalPages > 1 && (
        <Pagination
          totalPages={totalPages}
          page={currentPage}
          setPage={setCurrentPage}
        />
      )}
      <button className={css.button}>Create note +</button>
    </header>
  </div>;
}
