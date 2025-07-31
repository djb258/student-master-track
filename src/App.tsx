import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import Index from "./pages/Index";
import Intake from "./pages/Intake";
import Dashboard from "./pages/Dashboard";
import Reports from "./pages/Reports";
import StudentProfile from "./pages/StudentProfile";
import WrestlingTeam from "./pages/WrestlingTeam";
import WrestlingStats from "./pages/WrestlingStats";
import Academics from "./pages/Academics";
import AIDashboard from "./pages/AIDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/intake" element={<Intake />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/profile/:student_id" element={<StudentProfile />} />
          <Route path="/wrestling/team" element={<WrestlingTeam />} />
          <Route path="/wrestling/stats" element={<WrestlingStats />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/ai-dashboard" element={<AIDashboard />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
