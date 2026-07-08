export default function PageShell({ children, className = "" }) {
  return (
    <main id="content" className={`page-shell page-grid pt-32 sm:pt-36 ${className}`}>
      {children}
    </main>
  );
}
