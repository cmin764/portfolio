import { useDocumentTitle } from "@/hooks/useDocumentTitle";

export default function Index() {
  useDocumentTitle("Portfolio");

  return (
    <div className="container py-16">
      <h1 className="text-3xl font-semibold">Portfolio</h1>
      <p className="mt-4 text-muted-foreground">Coming soon.</p>
    </div>
  );
}
