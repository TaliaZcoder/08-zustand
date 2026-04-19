import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";
import type { Metadata } from "next";

import { fetchNotes } from "@/lib/api";

import NotesClient from "./Notes.client";

type Props = {
  params: Promise<{
    slug: string[];
  }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;

  const tag =
    slug?.[0] === "all"
      ? "All notes"
      : slug?.[0];

  return {
    title: `Notes - ${tag}`,
    description: `Browse notes filtered by ${tag}.`,

    openGraph: {
      title: `Notes - ${tag}`,
      description: `Browse notes filtered by ${tag}.`,
      url: `https://your-vercel-url.vercel.app/notes/filter/${slug[0]}`,
      images: [
        {
          url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        },
      ],
    },
  };
}

export default async function FilterPage({
  params,
}: Props) {
  const { slug } = await params;

  const tag =
    slug?.[0] === "all"
      ? ""
      : slug?.[0];

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["notes", 1, "", tag],
    queryFn: () =>
      fetchNotes(1, "", tag),
  });
  return (
    <HydrationBoundary
      state={dehydrate(queryClient)}
    >
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}

