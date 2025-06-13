export default function ShareLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>; // no nav, no layout wrappers
}
