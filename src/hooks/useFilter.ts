import { useState } from "react";
import type { Category } from "@/data/types";

export function useFilter() {
  const [active, setActive] = useState<Category | 'all'>('all');
  return { active, setActive };
}
