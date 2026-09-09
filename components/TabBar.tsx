"use client";

import { TABS, TabId } from "@/lib/tabs";

interface TabBarProps {
  active: TabId;
  onChange: (id: TabId) => void;
}

export default function TabBar({ active, onChange }: TabBarProps) {
  return (
    <nav className="border-b border-beacon-border bg-beacon-surface">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 overflow-x-auto">
        <ul className="flex gap-6 min-w-max">
          {TABS.map((tab) => {
            const isActive = tab.id === active;
            return (
              <li key={tab.id}>
                <button
                  type="button"
                  onClick={() => onChange(tab.id)}
                  className={`relative py-3.5 text-sm transition-colors ${
                    isActive
                      ? "font-bold text-beacon-ink"
                      : "font-medium text-beacon-muted hover:text-beacon-ink"
                  }`}
                >
                  {tab.label}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-beacon-blue" />
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
