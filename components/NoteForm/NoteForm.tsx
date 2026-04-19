import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import css from "./NoteForm.module.css";

import { createNote } from "@/lib/api";
import type { NoteTag } from "../../types/note";

export interface NoteFormValues {
  title: string;
  content: string;
  tag: NoteTag;
}

export interface NoteFormProps {
  onClose: () => void;
}

export default function NoteForm() {
  const router = useRouter();
  const queryClient = useQueryClient();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("Todo");

  const mutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["notes"],
      });

      router.push("/notes/filter/all");
    },
  });

  const handleSubmit = (
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    mutation.mutate({
      title,
      content,
      tag,
    });
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
          value={title}
          onChange={(e) =>
            setTitle(e.target.value)
          }
          required
        />
      </div>

      <div className={css.formGroup}>
        <label>Content</label>

        <textarea
          className={css.textarea}
          value={content}
          onChange={(e) =>
            setContent(e.target.value)
          }
        />
      </div>

      <div className={css.formGroup}>
        <label>Tag</label>

        <select
          className={css.select}
          value={tag}
          onChange={(e) =>
            setTag(e.target.value)
          }
        >
          <option value="Todo">Todo</option>
          <option value="Work">Work</option>
          <option value="Personal">
            Personal
          </option>
          <option value="Meeting">
            Meeting
          </option>
          <option value="Shopping">
            Shopping
          </option>
        </select>
      </div>

      <div className={css.actions}>
        <button
          type="submit"
          className={css.submitButton}
        >
          Create note
        </button>
      </div>
    </form>
  );
}