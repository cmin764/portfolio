import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

const NODE_ROLES = [
  { label: "Person / User °", fill: "#dbe4ff", border: "#748ffc" },
  { label: "UI / Frontend", fill: "#a5d8ff", border: "#1971c2" },
  { label: "Service / API", fill: "#96f2d7", border: "#099268" },
  { label: "DB / Cache / Store", fill: "#ffd8a8", border: "#e8590c" },
  { label: "Queue / Stream / Topic", fill: "#ffc9c9", border: "#e03131" },
  { label: "External / SaaS", fill: "#e9ecef", border: "#868e96" },
  { label: "Artifact / generated file †", fill: "#fef9c3", border: "#ca8a04" },
] as const;

export function DiagramLegend() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "text-xs text-muted-foreground hover:text-foreground transition-colors",
          "flex items-center gap-1 mt-2"
        )}
        aria-label="Open diagram legend"
      >
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <circle cx="6" cy="6" r="5.5" stroke="currentColor" />
          <path d="M6 5.5v3M6 3.5v.5" stroke="currentColor" strokeLinecap="round" />
        </svg>
        Legend
      </button>

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-label="Diagram legend"
        >
          <div
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
          <div className="relative bg-card border border-border rounded-lg shadow-lg max-w-md w-full p-5 space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Reading this diagram</h2>
              <button
                onClick={() => setOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close legend"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                  <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <section className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Node colors</h3>
              <ul className="space-y-1.5">
                {NODE_ROLES.map(({ label, fill, border }) => (
                  <li key={label} className="flex items-center gap-2.5 text-xs">
                    <span
                      className="inline-block w-4 h-4 rounded-sm shrink-0"
                      style={{ background: fill, border: `1.5px solid ${border}` }}
                    />
                    <span className="text-foreground">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">° Person nodes use ellipses. † Artifacts use sharp corners. All other nodes use rounded rectangles; role is color + label.</p>
            </section>

            <section className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Arrow styles</h3>
              <div className="text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-muted-foreground font-normal pb-1.5 pr-3 w-24"></th>
                      <th className="text-left text-muted-foreground font-normal pb-1.5 pr-3">Filled head</th>
                      <th className="text-left text-muted-foreground font-normal pb-1.5">Open head</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="text-muted-foreground pr-3 py-1 align-top">Solid line</td>
                      <td className="text-foreground pr-3 py-1 align-top">Sync call</td>
                      <td className="text-foreground py-1 align-top">Async fire-and-forget</td>
                    </tr>
                    <tr>
                      <td className="text-muted-foreground pr-3 py-1 align-top">Dashed line</td>
                      <td className="text-foreground pr-3 py-1 align-top">Cron / polling / build dep</td>
                      <td className="text-foreground py-1 align-top">Background async (logs, telemetry)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-xs text-muted-foreground">Arrows point from initiator to dependency, not in the direction data flows.</p>
            </section>

            <section className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Label format</h3>
              <div className="text-xs">
                <table className="w-full border-collapse">
                  <thead>
                    <tr>
                      <th className="text-left text-muted-foreground font-medium pb-1.5 pr-3">Pattern</th>
                      <th className="text-left text-muted-foreground font-medium pb-1.5">Meaning</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td className="text-foreground font-mono pr-3 py-0.5 align-top">Name</td><td className="text-muted-foreground py-0.5 align-top">node name</td></tr>
                    <tr><td className="text-foreground font-mono pr-3 py-0.5 align-top">&lt;Type&gt;</td><td className="text-muted-foreground py-0.5 align-top">C4 abstraction level (optional)</td></tr>
                    <tr><td className="text-foreground font-mono pr-3 py-0.5 align-top">[Technology]</td><td className="text-muted-foreground py-0.5 align-top">runtime stack</td></tr>
                    <tr><td className="text-foreground font-mono pr-3 py-0.5 align-top">Description (status)</td><td className="text-muted-foreground py-0.5 align-top">node description and lifecycle qualifier, e.g. planned, assumed, deprecated</td></tr>
                    <tr><td className="text-foreground font-mono pr-3 py-1 align-top">out / in</td><td className="text-muted-foreground py-1 align-top">arrow label: outbound data / inbound response</td></tr>
                  </tbody>
                </table>
              </div>
            </section>

            <section className="space-y-2">
              <h3 className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Boundary frames</h3>
              <ul className="space-y-1.5 text-xs">
                <li className="flex items-start gap-2.5">
                  <span className="text-muted-foreground shrink-0 w-20">Dashed</span>
                  <span className="text-foreground">Deployment / trust boundary: groups multiple containers</span>
                </li>
                <li className="flex items-start gap-2.5">
                  <span className="text-muted-foreground shrink-0 w-20">Solid</span>
                  <span className="text-foreground">Expansion frame: one container opened to show its internals</span>
                </li>
              </ul>
            </section>
          </div>
        </div>
      )}
    </>
  );
}
