import { Link, useLocation } from "react-router-dom";
import { Users, Settings, BarChart3, Scissors } from "lucide-react";

const SidebarAdmin = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { title: "Relatórios Rápidos", icon: BarChart3, path: "/relatorios" },
  ];

  return (
    <aside className="w-64 bg-muted/30 border-r border-border min-h-screen p-6">
      <nav className="space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = item.path.startsWith("#") ? false : currentPath === item.path;
          
          return (
            <Link
              key={item.title}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? "bg-foreground text-background"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};

export default SidebarAdmin;
