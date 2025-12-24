import { useState, useRef, useEffect } from 'react';
import { Moon, Sun, LogOut, FolderOpen, Menu, X } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

export default function Header({ 
  darkMode, 
  onToggleDarkMode, 
  onLogout, 
  onOpenDrive,
  stats,
  userEmail,
  userAvatar
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleMenuAction = (action) => {
    setMenuOpen(false);
    action();
  };

  return (
    <header className="bg-card mt-5 mb-5 rounded-[24px] shadow-sm">
      <div className="px-4 sm:px-7 py-4 sm:py-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 sm:gap-3 min-w-0 flex-1 mr-3">
            {/* Avatar + Email Badge */}
            <div className="flex items-center gap-2 sm:gap-2.5 bg-secondary px-2 sm:px-3 py-1.5 sm:py-2 rounded-full max-w-fit">
              {userAvatar ? (
                <img 
                  src={userAvatar} 
                  alt="User avatar" 
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white dark:text-black font-medium text-[10px] sm:text-xs">
                    {userEmail ? userEmail[0].toUpperCase() : '?'}
                  </span>
                </div>
              )}
              {userEmail && (
                <span className="text-xs sm:text-sm font-medium truncate max-w-[120px] sm:max-w-[200px]">{userEmail}</span>
              )}
            </div>
            
            {/* Stats Badges */}
            <div className="flex gap-1.5 sm:gap-2.5">
              <Badge variant="secondary" className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1">Total: {stats.total}</Badge>
              <Badge variant="success" className="text-[10px] sm:text-xs px-2 sm:px-2.5 py-0.5 sm:py-1">Active: {stats.used}</Badge>
            </div>
          </div>
          
          {/* Desktop: Show all buttons */}
          <div className="hidden sm:flex items-center gap-2">
            <Button onClick={onOpenDrive} size="icon" variant="ghost" className="rounded-[12px]">
              <FolderOpen className="h-5 w-5" />
            </Button>
            <Button onClick={onToggleDarkMode} size="icon" variant="ghost" className="rounded-[12px]">
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button onClick={onLogout} size="icon" variant="ghost" className="rounded-[12px]">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>

          {/* Mobile: Menu button */}
          <div className="sm:hidden relative" ref={menuRef}>
            <Button 
              onClick={() => setMenuOpen(!menuOpen)} 
              size="icon" 
              variant="ghost" 
              className="rounded-[12px] h-9 w-9"
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 top-full mt-2 bg-card border border-border rounded-xl shadow-lg py-2 min-w-[160px] z-50">
                <button
                  onClick={() => handleMenuAction(onOpenDrive)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-left"
                >
                  <FolderOpen className="h-4 w-4" />
                  <span className="text-sm">Google Drive</span>
                </button>
                <button
                  onClick={() => handleMenuAction(onToggleDarkMode)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-left"
                >
                  {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                  <span className="text-sm">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                <button
                  onClick={() => handleMenuAction(onLogout)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-secondary transition-colors text-left text-red-500"
                >
                  <LogOut className="h-4 w-4" />
                  <span className="text-sm">Đăng xuất</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
