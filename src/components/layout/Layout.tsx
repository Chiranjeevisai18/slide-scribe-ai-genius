
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

export function Layout({ children, showSidebar = true }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background flex">
      {showSidebar && <Sidebar />}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}
