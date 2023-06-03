export default function FourGridLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-6 grid md:grid-cols-3 grid-cols-1 gap-4">
      {children}
    </section>
  );
}
