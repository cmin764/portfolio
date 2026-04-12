import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const ThemeIcon = theme === "light" ? Sun : theme === "dark" ? Moon : Monitor;

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 transition-colors",
        scrolled ? "border-border/50" : "border-transparent"
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        <Link
          to="/"
          className="text-base font-semibold tracking-tight hover:text-foreground transition-colors"
        >
          Cosmin Poieana
        </Link>

        <div className="flex items-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              location.pathname === "/" ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Portfolio
          </span>
          <button
            onClick={toggleTheme}
            className="p-2 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={`Current theme: ${theme}. Click to toggle.`}
            title={`Theme: ${theme}`}
          >
            <ThemeIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
  );
}
