import { Home, Search, MessageCircle, Bell, User } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export default function BottomNav() {
  const location = useLocation();
  
  const navItems = [
    { icon: Home, path: '/' },
    { icon: Search, path: '/discover' },
    { icon: MessageCircle, path: '/messages' },
    { icon: Bell, path: '/notifications' },
    { icon: User, path: '/profile' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 flex justify-around py-2 md:hidden">
      {navItems.map(({ icon: Icon, path }) => (
        <Link key={path} to={path} className={location.pathname === path ? 'text-[#6B46C1]' : 'text-gray-400'}>
          <Icon size={24} />
        </Link>
      ))}
    </div>
  );
}
