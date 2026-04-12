import { Github, Linkedin, Mail, ArrowUpRight } from "lucide-react";
import { LINKS } from "@/lib/constants";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-secondary/30">
      <div className="container py-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-1">
            <p className="text-sm font-semibold">Cosmin Poieana</p>
            <p className="text-xs text-muted-foreground">Fractional AI Product Strategist</p>
          </div>

          <div className="flex items-center gap-4">
            <a
              href={LINKS.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href={LINKS.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:${LINKS.email}`}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </a>
            <a
              href={LINKS.cvPdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-muted-foreground hover:text-foreground transition-colors font-medium"
            >
              CV PDF
            </a>
            <a
              href={LINKS.wandercodeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-medium hover:text-foreground text-muted-foreground transition-colors"
            >
              wandercode.ltd <ArrowUpRight className="h-3 w-3" />
            </a>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-muted-foreground">
          &copy; {currentYear} Cosmin Poieana
        </p>
      </div>
    </footer>
  );
}
