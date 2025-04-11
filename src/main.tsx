
import { createRoot } from 'react-dom/client';
import { ClerkProvider } from "@clerk/clerk-react";
import App from './App.tsx';
import './index.css';

// Make sure you replace this with your actual publishable key
// You'll need to get this from the Clerk dashboard
const PUBLISHABLE_KEY = "YOUR_CLERK_PUBLISHABLE_KEY";

createRoot(document.getElementById("root")!).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <App />
  </ClerkProvider>
);
