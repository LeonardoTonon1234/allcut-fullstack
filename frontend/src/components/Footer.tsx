import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-background border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-foreground">
          <span>AllCut © 2025</span>
          <span className="hidden md:inline">|</span>
          <span>Siga-nos nas redes sociais:</span>
          <div className="flex items-center gap-4">
            <Link to="#" className="hover:text-muted-foreground transition-colors">
              Twitter
            </Link>
            <Link to="#" className="hover:text-muted-foreground transition-colors">
              Instagram
            </Link>
            <Link to="#" className="hover:text-muted-foreground transition-colors">
              Facebook
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
