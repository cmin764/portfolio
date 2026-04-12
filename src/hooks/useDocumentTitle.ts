import { useEffect } from "react";

export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title ? `${title} | Cosmin Poieana` : "Portfolio | Cosmin Poieana";
  }, [title]);
}
