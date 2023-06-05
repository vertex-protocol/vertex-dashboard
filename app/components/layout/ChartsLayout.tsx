export default function ChartsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="py-6 grid lg:grid-cols-2 grid-cols-1 gap-4">
      {children}
    </section>
  );
}
