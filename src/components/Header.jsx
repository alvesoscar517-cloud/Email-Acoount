import { Moon, Sun, LogOut, FolderOpen } from 'lucide-react';
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
  return (
    <header className="bg-card mt-5 mb-5 rounded-[24px] shadow-sm">
      <div className="px-7 py-5">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-3">
            {/* Avatar + Email Badge */}
            <div className="flex items-center gap-2.5 bg-secondary px-3 py-2 rounded-full">
              {userAvatar ? (
                <img 
                  src={userAvatar} 
                  alt="User avatar" 
                  className="w-8 h-8 rounded-full object-cover flex-shrink-0"
                />
              ) : (
                <div className="w-8 h-8 bg-black dark:bg-white rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white dark:text-black font-medium text-xs">
                    {userEmail ? userEmail[0].toUpperCase() : '?'}
                  </span>
                </div>
              )}
              {userEmail && (
                <span className="text-sm font-medium truncate max-w-[200px]">{userEmail}</span>
              )}
            </div>
            
            {/* Stats Badges */}
            <div className="flex gap-2.5">
              <Badge variant="secondary">Total: {stats.total}</Badge>
              <Badge variant="success">Active: {stats.used}</Badge>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
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
        </div>
      </div>
    </header>
  );
}
