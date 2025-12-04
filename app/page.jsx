"use client";

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-[#050816] text-slate-100 page-enter">
      <Navbar />
      <HeroSection />
    </main>
  );
}
