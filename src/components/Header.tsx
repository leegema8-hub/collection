import React from 'react';

interface HeaderProps {
  title: string;
  onMenuClick?: () => void;
  onSearchClick?: () => void;
  showSearchButton?: boolean;
}

export const Header: React.FC<HeaderProps> = ({
  title,
  onMenuClick,
  onSearchClick,
  showSearchButton = true,
}) => {
  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#f7f9fb]/90 backdrop-blur-md flex justify-between items-center px-4 h-16 border-b border-[#eceef0]/60">
      <div className="flex items-center gap-4">
        <button 
          onClick={onMenuClick}
          className="material-symbols-outlined text-[#091426] p-1.5 rounded-full hover:bg-[#eceef0]/80 active:scale-95 transition-all text-xl cursor-pointer"
        >
          menu
        </button>
        <h1 className="text-xl font-bold text-[#091426] tracking-tight font-sans">
          {title}
        </h1>
      </div>
      
      {showSearchButton && (
        <button 
          onClick={onSearchClick}
          className="material-symbols-outlined text-[#091426] p-2 rounded-full hover:bg-[#eceef0]/80 active:scale-95 transition-all text-xl cursor-pointer"
        >
          search
        </button>
      )}
    </header>
  );
};
export default Header;
