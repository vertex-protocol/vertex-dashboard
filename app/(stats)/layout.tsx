import Nav from '../components/layout/NavBar';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. nav, stats header, and tabs */}
      <Nav />
      {children}
    </section>
  );
}
