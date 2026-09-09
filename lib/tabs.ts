export type TabId = "signals" | "root-cause" | "content-engine" | "franchisee-gallery";

export interface TabDef {
  id: TabId;
  label: string;
}

export const TABS: TabDef[] = [
  { id: "signals", label: "Signals" },
  { id: "root-cause", label: "Root Cause" },
  { id: "content-engine", label: "Content Engine" },
  { id: "franchisee-gallery", label: "Franchisee Gallery" },
];
