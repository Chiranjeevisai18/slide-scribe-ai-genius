
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { UserButton } from "@clerk/clerk-react";
import { 
  CirclePlus, 
  LayoutDashboard, 
  FilePresentation, 
  Settings as SettingsIcon,
  Menu, 
  X, 
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <LayoutDashboard size={20} /> },
    { name: "Templates", path: "/templates", icon: <FilePresentation size={20} /> },
    { name: "Settings", path: "/settings", icon: <SettingsIcon size={20} /> },
  ];

  return (
    <>
      <div className={cn(
        "fixed top-0 left-0 z-40 h-full transition-all duration-300 bg-sidebar",
        collapsed ? "w-16" : "w-64"
      )}>
        <div className="h-full flex flex-col border-r">
          <div className="flex items-center h-16 px-4 border-b">
            <div className={cn("flex items-center", collapsed ? "justify-center w-full" : "justify-between w-full")}>
              {!collapsed && <Link to="/dashboard" className="flex items-center gap-2">
                <Sparkles className="text-purple-500" size={24} />
                <span className="font-bold text-lg">SlideScribe</span>
              </Link>}
              {collapsed && <Link to="/dashboard">
                <Sparkles className="text-purple-500" size={24} />
              </Link>}
              <Button variant="ghost" size="icon" onClick={toggleSidebar}>
                {collapsed ? <Menu size={20} /> : <X size={20} />}
              </Button>
            </div>
          </div>
          
          <div className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-2 px-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className={cn(
                      "flex items-center p-2 rounded-lg hover:bg-purple-light transition-colors",
                      location.pathname === item.path ? "bg-purple-light text-purple-dark" : "",
                      collapsed ? "justify-center" : "gap-3"
                    )}
                  >
                    {item.icon}
                    {!collapsed && <span>{item.name}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="px-4 py-3 border-t">
            <Link to="/editor">
              <Button 
                className={cn(
                  "w-full bg-purple hover:bg-purple-dark",
                  collapsed ? "p-2 justify-center" : ""
                )}
              >
                <CirclePlus size={20} />
                {!collapsed && <span className="ml-2">New Presentation</span>}
              </Button>
            </Link>
            <div className={cn(
              "mt-4",
              collapsed ? "flex justify-center" : "flex items-center gap-3"
            )}>
              <UserButton afterSignOutUrl="/" />
              {!collapsed && <span className="text-sm">Account</span>}
            </div>
          </div>
        </div>
      </div>
      
      {/* Main content spacer to account for sidebar */}
      <div className={cn(
        "transition-all duration-300",
        collapsed ? "ml-16" : "ml-64"
      )} />
    </>
  );
}
