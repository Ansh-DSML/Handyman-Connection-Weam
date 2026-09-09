"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, MessageCircle, Send, Bookmark, Check, Rocket } from "lucide-react";
import franchisees from "@/data/franchisees.json";
import contentConcepts from "@/data/content-concepts.json";
import { Franchisee, ContentConcept, PushStatus } from "@/lib/types";

const typedFranchisees = franchisees as Franchisee[];
const typedConcepts = contentConcepts as ContentConcept[];
const topConcept = typedConcepts[0];
const featured =
  typedFranchisees.find((f) => f.location === "Alpharetta, GA") ?? typedFranchisees[0];

function initials(name: string) {
  return name
    .replace("Handyman Connection of ", "")
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

function handle(location: string) {
  return "hc_" + location.split(",")[0].toLowerCase().replace(/\s+/g, "");
}

export default function FranchiseeGalleryTab() {
  const [statuses, setStatuses] = useState<Record<string, PushStatus>>(() =>
    Object.fromEntries(typedFranchisees.map((f) => [f.name, f.push_status]))
  );

  const pushedCount = useMemo(
    () => Object.values(statuses).filter((s) => s === "pushed").length,
    [statuses]
  );
  const hasPushed = pushedCount > 0;

  function pushOne(name: string) {
    setStatuses((prev) => ({ ...prev, [name]: "pushed" }));
  }

  function pushAll() {
    typedFranchisees.forEach((f, i) => {
      setTimeout(() => pushOne(f.name), i * 150);
    });
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Left column — Instagram-style mockup */}
      <section>
        <h2 className="text-sm font-bold text-beacon-ink mb-3">
          Localized preview: {featured.location}
        </h2>
        <div className="mx-auto max-w-sm rounded-xl border border-beacon-border bg-beacon-surface shadow-beacon overflow-hidden">
          <div className="flex items-center gap-2.5 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-beacon-blue text-xs font-bold text-white">
              {initials(featured.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-xs font-bold text-beacon-ink">{featured.name}</p>
              <p className="text-[10px] text-beacon-muted">Sponsored</p>
            </div>
          </div>

          <div className="aspect-square bg-gradient-to-br from-beacon-blue to-beacon-ink flex items-center justify-center p-6">
            <p className="font-serif text-center text-xl font-semibold leading-snug text-white">
              {topConcept.headline}
            </p>
          </div>

          <div className="flex items-center gap-3 px-3 pt-3">
            <Heart className="h-5 w-5 text-beacon-ink" />
            <MessageCircle className="h-5 w-5 text-beacon-ink" />
            <Send className="h-5 w-5 text-beacon-ink" />
            <Bookmark className="ml-auto h-5 w-5 text-beacon-ink" />
          </div>

          <div className="p-3 pt-2">
            <p className="text-xs text-beacon-ink">
              <span className="font-bold">{handle(featured.location)}</span> {topConcept.headline}{" "}
              #HandymanConnection #{featured.location.split(",")[0].replace(/\s+/g, "")}
              {" "}#ReliableRepairs
            </p>
          </div>
        </div>
      </section>

      {/* Right column — franchisee list + push */}
      <section>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-bold text-beacon-ink">Franchisees</h2>
          <AnimatePresence mode="popLayout">
            <motion.span
              key={pushedCount}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 4 }}
              className="text-xs font-medium text-beacon-muted"
            >
              {pushedCount} of {typedFranchisees.length} locations live
            </motion.span>
          </AnimatePresence>
        </div>

        <div className="space-y-3">
          {typedFranchisees.map((f) => {
            const pushed = statuses[f.name] === "pushed";
            return (
              <div
                key={f.name}
                className="flex items-center justify-between gap-3 rounded-xl border border-beacon-border bg-beacon-surface p-4 shadow-beacon"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-bold text-beacon-ink">{f.location}</p>
                  <p className="text-xs text-beacon-muted">
                    {f.star_rating}★ · {f.phone} · Health {f.health_score}
                  </p>
                </div>
                <motion.button
                  type="button"
                  disabled={pushed}
                  onClick={() => pushOne(f.name)}
                  animate={{
                    backgroundColor: pushed ? "#DCFCE7" : "#003DA5",
                    color: pushed ? "#16A34A" : "#FFFFFF",
                  }}
                  transition={{ duration: 0.25 }}
                  className="shrink-0 rounded-lg px-3 py-1.5 text-xs font-bold"
                >
                  {pushed ? (
                    <span className="flex items-center gap-1">
                      <Check className="h-3.5 w-3.5" /> Pushed
                    </span>
                  ) : (
                    "Push to Meta + Instagram"
                  )}
                </motion.button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={pushAll}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-beacon-yellow px-4 py-2.5 text-sm font-bold text-beacon-ink hover:brightness-95 transition"
        >
          <Rocket className="h-4 w-4" />
          Push to all
        </button>

        <AnimatePresence>
          {hasPushed && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-4 overflow-hidden rounded-xl border-l-4 border-beacon-green bg-green-50 p-4"
            >
              <p className="text-sm font-bold text-beacon-ink">
                {pushedCount * 2} creatives generated
              </p>
              <p className="mt-1 text-xs text-beacon-muted">
                Auto-scheduled for tomorrow at 9:00 AM local time.
              </p>
              <p className="mt-1 text-xs text-beacon-muted">
                Franchisees are notified and can preview before publish.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
    </div>
  );
}
