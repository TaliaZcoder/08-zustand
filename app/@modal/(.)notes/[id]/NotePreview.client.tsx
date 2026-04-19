'use client';

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { fetchNoteById } from "@/lib/api";

import Modal from "@/components/Modal/Modal";

import css from "./NotePreview.module.css";

export default function NotePreview() {
  const router =
    useRouter();

  const params =
    useParams<{
      id: string;
    }>();

  const id = params.id;

  const {
    data: note,
    isLoading,
    error,
  } = useQuery({
    queryKey: [
      "note",
      id,
    ],

    queryFn: () =>
      fetchNoteById(id),

    refetchOnMount:
      false,
  });

  if (isLoading) {
    return <p>Loading, please wait...</p>;
  }

  if (error || !note) {
    return <p>Something went wrong.</p>;
  }

  return (
    <Modal onClose={() => router.back()}
    >
        <div className={css.container}>
          <h2 className={css.title}>{note.title}</h2>

          <p className={css.tag}>{note.tag}</p>

          <p className={css.content}>{note.content}</p>

          <p className={css.date}>
            {new Date(note.createdAt).toLocaleDateString()}
          </p>
        </div>
    </Modal>
  );
}