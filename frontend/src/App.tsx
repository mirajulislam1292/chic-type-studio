import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@/hooks/useTheme";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import HydroVerPage from "./pages/projects/HydroVerPage";
import TrueMediPage from "./pages/projects/TrueMediPage";
import AEyePage from "./pages/projects/AEyePage";
import NutriDripPage from "./pages/projects/NutriDripPage";
import QCECPage from "./pages/projects/QCECPage";
import Gallery from "./pages/Gallery";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
  <HashRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/projects/hydrover" element={<HydroVerPage />} />
            <Route path="/projects/truemedi" element={<TrueMediPage />} />
            <Route path="/projects/a-eye" element={<AEyePage />} />
            <Route path="/projects/nutridrip" element={<NutriDripPage />} />
            <Route path="/essays/qcec" element={<QCECPage />} />
            <Route path="/gallery" element={<Gallery />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
  </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
