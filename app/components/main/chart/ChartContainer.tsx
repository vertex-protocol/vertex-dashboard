export default function ChartContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-3 border border-gray-2 rounded h-96">
      {children}
    </section>
  );
}
