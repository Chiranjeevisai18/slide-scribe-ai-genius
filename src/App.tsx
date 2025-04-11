
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { SignedIn, SignedOut, RedirectToSignIn, useClerk, useUser } from "@clerk/clerk-react";

import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Editor from "./pages/Editor";
import Templates from "./pages/Templates";
import Settings from "./pages/Settings";
import { useEffect, useState } from "react";
import { useToast } from "./hooks/use-toast";

const queryClient = new QueryClient();

// Auth guard component to handle authentication state and redirects
const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useUser();
  const { toast } = useToast();
  
  useEffect(() => {
    // Show welcome toast when user logs in
    if (isLoaded && user) {
      toast({
        title: `Welcome, ${user.firstName || user.username || 'there'}!`,
        description: "You're now signed in to SlideScribe AI",
      });
    }
  }, [isLoaded, user, toast]);
  
  if (!isLoaded) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  return <>{children}</>;
};

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
            <Route path="/" element={
              <>
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
                <SignedOut>
                  <Index />
                </SignedOut>
              </>
            } />
            <Route path="/login" element={
              <>
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
                <SignedOut>
                  <Login />
                </SignedOut>
              </>
            } />
            <Route path="/signup" element={
              <>
                <SignedIn>
                  <Navigate to="/dashboard" replace />
                </SignedIn>
                <SignedOut>
                  <Signup />
                </SignedOut>
              </>
            } />
            <Route
              path="/dashboard"
              element={
                <>
                  <SignedIn>
                    <AuthGuard>
                      <Dashboard />
                    </AuthGuard>
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
                    <AuthGuard>
                      <Editor />
                    </AuthGuard>
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
                    <AuthGuard>
                      <Templates />
                    </AuthGuard>
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
                    <AuthGuard>
                      <Settings />
                    </AuthGuard>
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
