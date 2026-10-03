import { useState, useEffect } from "react";

type Theme = "light" | "dark" | "system";

// Storage can throw (blocked in strict privacy modes) and hold stray values.
function readStoredTheme(): Theme | null {
  try {
    const v = localStorage.getItem("theme");
    return v === "light" || v === "dark" ? v : null;
  } catch {
    return null;
  }
}

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState<Theme>(() => {
    return typeof window !== "undefined" ? (readStoredTheme() ?? "system") : "system";
  });

  // Stored in state so the Header icon updates when the OS theme changes while in system mode
  const [resolvedTheme, setResolvedTheme] = useState<"light" | "dark">(() => {
    if (typeof window === "undefined") return "light";
    return readStoredTheme() ?? getSystemTheme();
  });

  useEffect(() => {
    const root = window.document.documentElement;

    const applyTheme = (resolved: "light" | "dark") => {
      root.classList.remove("light", "dark");
      root.classList.add(resolved);
      setResolvedTheme(resolved);
      const favicon = document.getElementById("favicon") as HTMLLinkElement | null;
      if (favicon) {
        favicon.href = `${import.meta.env.BASE_URL}favicon-${resolved}.svg`;
      }
    };

    if (theme === "system") {
      applyTheme(getSystemTheme());
      try { localStorage.removeItem("theme"); } catch { /* storage blocked */ }

      // Only subscribe to OS changes when in system mode
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) =>
        applyTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    } else {
      applyTheme(theme);
      try { localStorage.setItem("theme", theme); } catch { /* storage blocked */ }
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => {
      if (prev === "light") return "dark";
      if (prev === "dark") return "system";
      return "light";
    });
  };

  return { theme, setTheme, toggleTheme, resolvedTheme };
}
