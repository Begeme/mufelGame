"use client";
import { ReactNode } from "react";
import Footer from "./Footer";
import Navbar from "./Navbar";

export default function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <Navbar />
      <main className="flex-grow px-6 pt-24 pb-12 max-w-4xl mx-auto animate-fadeIn">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>
        <div className="prose prose-invert prose-lg max-w-none text-gray-300">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}