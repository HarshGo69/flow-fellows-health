import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

// Pages
import LandingPage from "./components/LandingPage"; // Adjust path if needed
import Login from "./pages/Login"; // Adjust path if needed
import NotFound from "./pages/NotFound"; // Adjust path if needed
import Index from "./pages/Index"; // Dashboard / main content

const queryClient = new QueryClient();

// Helper to check if user is authenticated
const isAuthenticated = () => localStorage.getItem("token") !== null;

// Protected Route Component
const ProtectedRoute = ({ element }: { element: React.ReactElement }) => {
  return isAuthenticated() ? element : <Navigate to="/login" replace />;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />

          {/* Login route: redirect to dashboard if already logged in */}
          <Route
            path="/login"
            element={isAuthenticated() ? <Navigate to="/dashboard" replace /> : <Login />}
          />

          {/* Protected dashboard */}
          <Route path="/dashboard" element={<ProtectedRoute element={<Index />} />} />

          {/* Catch-all 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
  