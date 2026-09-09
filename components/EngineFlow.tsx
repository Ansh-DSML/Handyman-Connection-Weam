"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles, Send, Inbox, Play } from "lucide-react";

interface FlowStep {
  icon: typeof Search;
  label: string;
  detail: string[];
}

const STEPS: FlowStep[] = [
  {
    icon: Search,
    label: "Research",
    detail: ["Competitor content & reviews", "Our sentiment, by theme"],
  },
  {
    icon: Sparkles,
    label: "Generate",
    detail: ["Headline + visual concept", "Meta compliance score"],
  },
  {
    icon: Send,
    label: "Push",
    detail: ["Targeted by franchisee & region", "Metrics roll up automatically"],
  },
  {
    icon: Inbox,
    label: "Franchisee Library",
    detail: ["Pushed. Ready to run locally."],
  },
];

const STEP_DELAY_MS = 900;

export default function EngineFlow() {
  const [activeIndex, setActiveIndex] = useState(-1);
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([]);

  function run() {
    timeouts.current.forEach(clearTimeout);
    timeouts.current = [];
    setActiveIndex(-1);
    STEPS.forEach((_, i) => {
      const t = setTimeout(() => setActiveIndex(i), (i + 1) * STEP_DELAY_MS);
      timeouts.current.push(t);
    });
  }

  useEffect(() => {
    run();
    return () => timeouts.current.forEach(clearTimeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="rounded-xl border border-beacon-border bg-beacon-surface p-5 shadow-beacon">
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-beacon-muted">
            Handyman Connection Hub · Content Engine
          </p>
          <p className="mt-1 text-sm text-beacon-ink">
            The Spring Remodel campaign, from brief to franchisee inbox, automatically.
          </p>
        </div>
        <button
          type="button"
          onClick={run}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-full border border-beacon-blue px-3.5 py-1.5 text-xs font-bold text-beacon-blue hover:bg-beacon-blue hover:text-white transition-colors"
        >
          <Play className="h-3 w-3" fill="currentColor" />
          Run it
        </button>
      </div>

      <div className="flex items-start overflow-x-auto">
        <div className="flex min-w-[560px] flex-1 items-start sm:min-w-0">
        {STEPS.map((step, i) => {
          const Icon = step.icon;
          const reached = i <= activeIndex;
          const isCurrent = i === activeIndex;
          return (
            <div key={step.label} className="flex flex-1 items-start last:flex-none">
              <div className="flex flex-col items-center text-center w-24 sm:w-32">
                <motion.div
                  animate={{
                    backgroundColor: reached ? "#003DA5" : "#FFFFFF",
                    borderColor: reached ? "#003DA5" : "#E5E0F2",
                    scale: isCurrent ? 1.12 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                  className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full border-2"
                >
                  <Icon
                    className={`h-4 w-4 sm:h-5 sm:w-5 ${
                      reached ? "text-white" : "text-beacon-muted"
                    }`}
                  />
                </motion.div>
                <p
                  className={`mt-2 text-xs sm:text-sm font-bold ${
                    reached ? "text-beacon-ink" : "text-beacon-muted"
                  }`}
                >
                  {step.label}
                </p>
                <div className="mt-1 space-y-0.5">
                  {step.detail.map((line) => (
                    <p key={line} className="text-[10px] sm:text-xs text-beacon-muted leading-snug">
                      {line}
                    </p>
                  ))}
                </div>
              </div>
              {i < STEPS.length - 1 && (
                <div className="relative top-5 sm:top-[22px] mx-1 sm:mx-2 h-0.5 flex-1 min-w-4 bg-beacon-border overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-beacon-blue"
                    initial={{ width: "0%" }}
                    animate={{ width: i < activeIndex ? "100%" : "0%" }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              )}
            </div>
          );
        })}
        </div>
      </div>
    </div>
  );
}
