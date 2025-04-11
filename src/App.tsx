
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useClerk } from "@clerk/clerk-react";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();

const App = () => {
  const [isAuthReady, setIsAuthReady] = useState(false);
  const { loaded } = useClerk();
  
  useEffect(() => {
    // Set auth as ready once Clerk has loaded
    if (loaded) {
      setIsAuthReady(true);
    }
  }, [loaded]);

  // This handles the case where Clerk initialization fails due to invalid key
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (!isAuthReady) {
        console.warn("Authentication initialization is taking too long. This might be due to an invalid Clerk key.");
        setIsAuthReady(true);
      }
    }, 2000);
    
    return () => clearTimeout(timeoutId);
  }, [isAuthReady]);

  if (!isAuthReady) {
    return <div className="min-h-screen flex items-center justify-center">Loading authentication...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/editor"
              element={
                <>
                  <SignedIn>
                    <Editor />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/templates"
              element={
                <>
                  <SignedIn>
                    <Templates />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <SignedIn>
                    <Settings />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
