import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import ChatWidget from "./components/ChatWidget";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Servicos from "./pages/Servicos";
import Contato from "./pages/Contato";
import Diagnostico from "./pages/Diagnostico";
import Privacidade from "./pages/Privacidade";
import DiagnosticoDetalhado from "./pages/DiagnosticoDetalhado";
import Construtoras from "./pages/Construtoras";
import Advogados from "./pages/Advogados";

function Router() {
  // make sure to consider if you need authentication for certain routes
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/sobre"} component={Sobre} />
      <Route path={"/servicos"} component={Servicos} />
      <Route path={"/contato"} component={Contato} />
      <Route path={"/construtoras"} component={Construtoras} />
      <Route path={"/advogados"} component={Advogados} />
      <Route path={"/diagnostico"} component={Diagnostico} />
      <Route path={"/diagnostico-detalhado"} component={DiagnosticoDetalhado} />
      <Route path={"/privacidade"} component={Privacidade} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
        // switchable
      >
        <TooltipProvider>
          <Toaster />
          <Router />
          <ChatWidget />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
