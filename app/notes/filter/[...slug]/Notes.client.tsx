'use client';

import { useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import {
  useQuery,
  keepPreviousData,
} from "@tanstack/react-query";

import { fetchNotes } from "@/lib/api";

import css from "@/app/notes/App.module.css";

import NoteList from "@/components/NoteList/NoteList";
import SearchBox from "@/components/SearchBox/SearchBox";
import Pagination from "@/components/Pagination/Pagination";
import Modal from "@/components/Modal/Modal";
import NoteForm from "@/components/NoteForm/NoteForm";

type Props = {
  tag?: string;
};

export default function NotesClient({
  tag = "",
}: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] =
    useState(false);

  const debouncedSearch =
    useDebouncedCallback(
      (value: string) => {
        setSearch(value);
        setPage(1);
      },
      500
    );

  const {
    data,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [
      "notes",
      page,
      search,
      tag,
    ],

    queryFn: () =>
      fetchNotes(
        page,
        search,
        tag
      ),

    placeholderData:
      keepPreviousData,
  });

  const notes = data?.notes ?? [];
  const totalPages =
    data?.totalPages ?? 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox
          onChange={
            debouncedSearch
          }
        />

        {totalPages > 1 && (
          <Pagination
            totalPages={
              totalPages
            }
            currentPage={
              page
            }
            onChange={
              setPage
            }
          />
        )}

        <button
          className={
            css.button
          }
          onClick={() =>
            setIsModalOpen(
              true
            )
          }
        >
          Create note +
        </button>
      </header>

      {isLoading && (
        <p>Loading...</p>
      )}

      {isError && (
        <p>
          Could not fetch
          notes.
        </p>
      )}

      {notes.length > 0 && (
        <NoteList
          notes={notes}
        />
      )}

      {!isLoading &&
        notes.length ===
          0 && (
          <p>
            No notes found.
          </p>
        )}

      {isModalOpen && (
        <Modal
          onClose={() =>
            setIsModalOpen(
              false
            )
          }
        >
          <NoteForm
            onClose={() =>
              setIsModalOpen(
                false
              )
            }
          />
        </Modal>
      )}
    </div>
  );
}