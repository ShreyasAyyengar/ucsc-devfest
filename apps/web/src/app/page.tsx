"use client";

import { useState } from "react";
import { DesktopView } from "@/components/desktop-view";
import { MobileView } from "@/components/mobile-view";

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [demoEmail] = useState("hacker@ucsc.edu");

  return (
    <>
      {/* Mobile View Wrapper */}
      <div className="lg:hidden">
        <MobileView />
      </div>

      {/* Desktop View Wrapper */}
      <div className="hidden lg:block">
        <DesktopView
          isAuthenticated={isAuthenticated}
          userEmail={demoEmail}
          onSignIn={() => setIsAuthenticated(true)}
          onSignOut={() => setIsAuthenticated(false)}
          onToggleAuth={() => setIsAuthenticated((prev) => !prev)}
        />
      </div>
    </>
  );
}
