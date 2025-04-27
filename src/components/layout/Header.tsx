
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from '@/components/ui/sheet';
import MobileNav from './MobileNav';

interface HeaderProps {
  showNav?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showNav = true }) => {
  const navigate = useNavigate();
  
  return (
    <header className="border-b sticky top-0 z-50 bg-white">
      <div className="container flex items-center justify-between h-16 px-4">
        <div className="flex items-center gap-2">
          <img 
            src="/logo-placeholder.svg" 
            alt="Sky Scholar" 
            className="h-8 w-8" 
            onClick={() => navigate('/')}
          />
          <h1 
            className="text-xl font-bold text-sky-600 cursor-pointer hidden sm:block" 
            onClick={() => navigate('/')}
          >
            Sky Scholar
          </h1>
        </div>
        
        {showNav && (
          <>
            <nav className="hidden md:flex items-center gap-6">
              <Button onClick={() => navigate('/chat')} variant="ghost">AI Chat</Button>
              <Button onClick={() => navigate('/study')} variant="ghost">Study Materials</Button>
              <Button onClick={() => navigate('/quiz')} variant="ghost">Practice Quiz</Button>
              <Button onClick={() => navigate('/profile')} variant="ghost">Profile</Button>
            </nav>
            
            <div className="md:hidden flex items-center">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="p-0">
                  <SheetHeader className="p-6 border-b">
                    <div className="flex items-center gap-2">
                      <img src="/logo-placeholder.svg" alt="Sky Scholar" className="h-8 w-8" />
                      <span className="text-lg font-semibold">Sky Scholar</span>
                    </div>
                  </SheetHeader>
                  <MobileNav />
                </SheetContent>
              </Sheet>
            </div>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
