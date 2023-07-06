export default function ChartContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="bg-gray-3 border border-gray-2 rounded pt-4 px-2 h-custom">
      {children}
    </section>
  );
}
