import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="container py-32 text-center">
      <h1 className="text-4xl font-semibold">404</h1>
      <p className="mt-4 text-muted-foreground">Page not found.</p>
      <Link to="/" className="mt-8 inline-block text-sm underline underline-offset-4">
        Back to portfolio
      </Link>
    </div>
  );
}
