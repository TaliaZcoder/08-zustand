type Props = {
  children: React.ReactNode;
};

export default function NotesLayout({
    children,
}: Props) {
    return (
    <>
        <div
        style={{
            display: "flex",
            gap: "32px",
            alignItems: "flex-start",
        }}
        >
        
        <section style={{ flex: 1 }}>
            {children}
        </section>
        </div>
    </>
  );
}