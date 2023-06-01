import Nav from '../components/layout/NavBar';
import Header from '../components/layout/Header';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include shared UI here e.g. nav, stats header, and tabs */}
      <Nav />
      <div className="px-10">
        <Header text="Vertex Stats" />
        {children}
      </div>
    </section>
  );
}
