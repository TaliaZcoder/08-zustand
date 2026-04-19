type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function FilterLayout({
  children,
  sidebar,
}: Props) {
  return (
    <div style={{ display: "flex", gap: "24px" }}>
      <aside>{sidebar}</aside>
      <main>{children}</main>
    </div>
  );
}