"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import TabBar from "@/components/TabBar";
import { TabId } from "@/lib/tabs";
import SignalsTab from "@/components/tabs/SignalsTab";
import RootCauseTab from "@/components/tabs/RootCauseTab";
import ContentEngineTab from "@/components/tabs/ContentEngineTab";
import FranchiseeGalleryTab from "@/components/tabs/FranchiseeGalleryTab";

export default function Home() {
  const [activeTab, setActiveTab] = useState<TabId>("signals");

  return (
    <div className="min-h-screen">
      <Header />
      <TabBar active={activeTab} onChange={setActiveTab} />
      <main className="mx-auto max-w-6xl px-4 sm:px-6 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {activeTab === "signals" && <SignalsTab />}
            {activeTab === "root-cause" && <RootCauseTab />}
            {activeTab === "content-engine" && <ContentEngineTab />}
            {activeTab === "franchisee-gallery" && <FranchiseeGalleryTab />}
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  );
}
