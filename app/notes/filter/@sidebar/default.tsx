import Link from "next/link";

import css from "./SidebarNotes.module.css";

const tags = [
  "All notes",
  "Todo",
  "Work",
  "Personal",
  "Meeting",
  "Shopping",
];

export default function DefaultSidebar() {
  return (
    <ul className={css.menuList}>
      {tags.map((tag) => {
        const href =
          tag === "All notes"
            ? "/notes/filter/all"
            : `/notes/filter/${tag}`;

        return (
          <li
            key={tag}
            className={css.menuItem}
          >
            <Link
              href={href}
              className={css.menuLink}
            >
              {tag}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}