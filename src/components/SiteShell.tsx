// /components/SiteShell.tsx
"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

export default function SiteShell({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Header onMenuClick={() => setSidebarOpen((prev) => !prev)} />
      <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] min-h-screen">
        <Sidebar isOpen={sidebarOpen} />
        <main className="p-4">{children}</main>
      </div>
    </>
  );
}
