import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import "./globals.css";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "NoteHub",
  description:
    "NoteHub is a modern app for creating, organizing and managing notes.",

  openGraph: {
    title: "NoteHub",
    description:
      "NoteHub is a modern app for creating, organizing and managing notes.",
    url: "https://your-vercel-url.vercel.app",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
      },
    ],
  },
};

type Props = {
  children: React.ReactNode;
  modal: React.ReactNode;
};

export default function RootLayout({
  children,
  modal,
}: Props) {
  return (
    <html lang="en">
      <body
        className={roboto.variable}
      >
        <TanStackProvider>
          <Header />

          <main>{children}</main>

          {modal}

          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}