import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border shadow-subtle">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className="text-xl font-bold text-foreground">A</span>
            </div>
            <span className="text-xl font-semibold text-foreground">AllCut</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-foreground hover:text-muted-foreground transition-colors">
              Início
            </Link>
            <Link to="/relatorios" className="text-foreground hover:text-muted-foreground transition-colors">
              Relatórios
            </Link>
            <Link to="/agendamentos" className="text-foreground hover:text-muted-foreground transition-colors">
              Agendamentos
            </Link>
            <Link to="/painel-administrativo" className="text-foreground hover:text-muted-foreground transition-colors">
              Painel Administrativo
            </Link>
            <Link to="/login" className="text-foreground hover:text-muted-foreground transition-colors">
              Login
            </Link>
            <Button variant="hero" size="default" asChild>
              <Link to="/cadastro">Cadastrar-se</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </Button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
