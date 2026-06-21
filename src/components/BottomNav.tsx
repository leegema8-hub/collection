import React from 'react';
import { ActiveTab } from '../types';

interface BottomNavProps {
  activeTab: ActiveTab;
  setActiveTab: (tab: ActiveTab) => void;
}

export const BottomNav: React.FC<BottomNavProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'overview' as ActiveTab, label: '概覽', icon: 'dashboard' },
    { id: 'collection' as ActiveTab, label: '我的收藏', icon: 'inventory_2' },
    { id: 'wishlist' as ActiveTab, label: '心願單', icon: 'favorite' },
    { id: 'analytics' as ActiveTab, label: '數據', icon: 'analytics' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center px-4 py-2 pb-safe bg-[#eceef0]/95 backdrop-blur-md shadow-[0_-4px_16px_rgba(9,20,38,0.04)] z-40 rounded-t-2xl border-t border-[#e0e3e5]/60 h-20">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center justify-center px-5 py-1.5 transition-all duration-300 ease-in-out active:scale-90 cursor-pointer ${
              isActive
                ? 'bg-[#1e293b] text-white rounded-full font-semibold shadow-sm px-6'
                : 'text-[#45474c] hover:bg-[#e0e3e5]/30'
            }`}
          >
            <span 
              className={`material-symbols-outlined text-[22px] transition-all ${
                isActive ? 'material-symbols-filled' : ''
              }`}
            >
              {tab.icon}
            </span>
            <span className="text-[11px] font-medium tracking-tight mt-0.5">
              {tab.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
export default BottomNav;
