'use client';

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";

import { createNote } from "@/lib/api";
import { useNoteStore } from "@/lib/store/noteStore";

import type { NoteTag } from "@/types/note";

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

   const {
    draft,
    setDraft,
    clearDraft,
  } = useNoteStore();

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      clearDraft();

      router.back();
    },
  });

  const handleSubmit = (
    e: React.SyntheticEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate(draft);
  };

   return (
    <form
      onSubmit={handleSubmit}
      className={css.form}
    >
      <div className={css.formGroup}>
        <label>Title</label>

        <input
          className={css.input}
          value={draft.title}
          onChange={(e) =>
            setDraft({
              title:
                e.target.value,
            })
          }
          required
        />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>

        <textarea
          className={css.textarea}
          value={draft.content}
          onChange={(e) =>
            setDraft({
              content:
                e.target.value,
            })
          }
        />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>

        <select
          className={css.select}
          value={draft.tag}
          onChange={(e) =>
            setDraft({
              tag:
                e.target.value as NoteTag,
            })
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">Personal</option>
          <option value="Meeting">Meeting</option>
          <option value="Shopping">Shopping</option>
        </select>
      </div>

       <div className={css.actions}>
         <button
          type="button"
          className={css.cancelButton}
          onClick={() => router.back()}
        >
          Cancel
         </button>
         
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending
            ? "Creating..."
            : "Create note"}
          </button>
      </div>
    </form>
  );
}