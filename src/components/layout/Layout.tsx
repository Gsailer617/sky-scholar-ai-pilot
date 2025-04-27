
import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  MessageSquare, 
  Book, 
  PenSquare, 
  User, 
  Search,
  Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface LayoutProps {
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ showHeader = true }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  
  const navItems = [
    { path: '/chat', icon: MessageSquare, label: 'AI Chat' },
    { path: '/study', icon: Book, label: 'Study Materials' },
    { path: '/quiz', icon: PenSquare, label: 'Practice Quiz' },
    { path: '/profile', icon: User, label: 'Profile' }
  ];
  
  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="flex h-screen">
      {showHeader && (
        <aside 
          className={cn(
            "bg-card text-card-foreground border-r border-border transition-all duration-300",
            sidebarOpen ? "w-64" : "w-20"
          )}
        >
          <div className="flex items-center gap-3 p-4 border-b border-border">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-primary/10">
              <img 
                src="/logo-placeholder.svg" 
                alt="Sky Scholar" 
                className="h-6 w-6" 
              />
            </div>
            {sidebarOpen && (
              <h1 className="text-xl font-semibold text-primary">Sky Scholar</h1>
            )}
          </div>
          
          <div className="p-3">
            <nav className="space-y-1 mt-3">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  className={cn(
                    "sidebar-item w-full text-left",
                    isActive(item.path) && "active"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {sidebarOpen && <span>{item.label}</span>}
                </button>
              ))}
            </nav>
          </div>
        </aside>
      )}

      <div className="flex flex-col flex-1 overflow-hidden">
        {showHeader && (
          <header className="bg-card text-card-foreground border-b border-border h-16 flex items-center px-4 gap-4">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="text-muted-foreground hover:text-foreground"
            >
              <Menu className="h-5 w-5" />
            </Button>
            
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search..." 
                  className="pl-8 bg-muted border-muted text-muted-foreground"
                />
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="h-4 w-4 text-primary" />
              </div>
            </div>
          </header>
        )}
        
        <main className="flex-1 overflow-auto bg-background">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
