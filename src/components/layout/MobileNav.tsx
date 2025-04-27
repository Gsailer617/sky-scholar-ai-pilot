
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MessageSquare, Book, PenSquare, User } from "lucide-react";

const MobileNav = () => {
  const navigate = useNavigate();

  const handleNavigation = (path: string) => {
    navigate(path);
  };

  return (
    <div className="flex flex-col py-4">
      <Button 
        variant="ghost" 
        className="justify-start pl-6 py-6 text-lg" 
        onClick={() => handleNavigation('/chat')}
      >
        <MessageSquare className="mr-3 h-5 w-5" />
        AI Chat
      </Button>
      <Button 
        variant="ghost" 
        className="justify-start pl-6 py-6 text-lg" 
        onClick={() => handleNavigation('/study')}
      >
        <Book className="mr-3 h-5 w-5" />
        Study Materials
      </Button>
      <Button 
        variant="ghost" 
        className="justify-start pl-6 py-6 text-lg" 
        onClick={() => handleNavigation('/quiz')}
      >
        <PenSquare className="mr-3 h-5 w-5" />
        Practice Quiz
      </Button>
      <Button 
        variant="ghost" 
        className="justify-start pl-6 py-6 text-lg" 
        onClick={() => handleNavigation('/profile')}
      >
        <User className="mr-3 h-5 w-5" />
        Profile
      </Button>
    </div>
  );
};

export default MobileNav;
