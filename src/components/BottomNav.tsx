import { Home, Search, MessageCircle, Bell, User, PlusSquare } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/', label: 'Home' },
    { icon: Search, path: '/discover', label: 'Discover' },
    { icon: PlusSquare, path: '/create', label: 'Create' },
    { icon: MessageCircle, path: '/messages', label: 'Messages' },
    { icon: User, path: '/profile', label: 'Profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t border-gray-200 flex justify-around py-2 z-50 md:hidden">
      {navItems.map(({ icon: Icon, path, label }) => {
        const isActive = location.pathname === path;
        return (
          <Link 
            key={path} 
            to={path} 
            className={`flex flex-col items-center gap-1 transition-colors ${isActive ? 'text-[#6B46C1]' : 'text-gray-400'}`}
          >
            <Icon size={24} strokeWidth={isActive ? 2.5 : 2} />
            <span className="text-xs">{label}</span>
          </Link>
        );
      })}
    </div>
  );
}
