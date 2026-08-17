// Style reminder: App shell follows the “Sổ tay thực địa” direction—warm paper canvas, field-note green, clear learning workflow, no generic centered landing page.
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Router as WouterRouter } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";

function Router() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL}>
      {/* This is a one-page learning app. Render Home for every project-site path so direct hash links never become a 404 route. */}
      <Home />
    </WouterRouter>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
