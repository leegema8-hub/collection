import React, { useState } from 'react';
import { CollectibleItem } from '../types';
import { getCategoryChinese } from '../utils';

interface CollectionTabProps {
  collectibles: CollectibleItem[];
  onOpenAddModal: () => void;
  onViewItem: (item: CollectibleItem) => void;
}

export const CollectionTab: React.FC<CollectionTabProps> = ({
  collectibles,
  onOpenAddModal,
  onViewItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Category tags definitions
  const categoriesList = [
    { id: 'all', label: '全部' },
    { id: 'figure', label: '公仔' },
    { id: 'album', label: '專輯' },
    { id: 'card', label: '小卡' },
    { id: 'perfume', label: '香水' },
    { id: 'model', label: '模型' },
    { id: 'watch', label: '腕錶' },
  ];

  // Filtering based on search query and category tags
  const filteredCollectibles = collectibles.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (item.source && item.source.toLowerCase().includes(searchQuery.toLowerCase())) ||
                          (item.notes && item.notes.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Calculate live value of filtered items or entire collection
  const liveFilteredTotal = filteredCollectibles.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="space-y-4 pb-24 relative">
      {/* Search Header Container */}
      <section className="space-y-3 pt-1">
        {/* Search Input wrapper */}
        <div className="relative">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[#75777d] pointer-events-none select-none text-xl">
            search
          </span>
          <input 
            type="text" 
            placeholder="搜尋您的珍藏..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12 pl-11 pr-4 bg-white border border-[#c5c6cd]/40 rounded-xl focus:ring-2 focus:ring-[#091426]/10 focus:border-[#091426] outline-none transition-all text-sm text-[#091426] placeholder-[#45474c]/50 shadow-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 material-symbols-outlined text-[#75777d] hover:text-[#091426] text-lg cursor-pointer"
            >
              close
            </button>
          )}
        </div>

        {/* Carousel of Category Filter Chips */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {categoriesList.map((cat) => {
            const isSel = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full font-sans text-xs tracking-tight transition-all duration-200 active:scale-95 cursor-pointer border ${
                  isSel
                    ? 'bg-[#091426] text-white border-[#091426] font-semibold shadow-sm'
                    : 'bg-[#eceef0] text-[#45474c] hover:bg-[#e0e3e5] border-transparent'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>
      </section>

      {/* Aggregate Estimation Score Card */}
      <section>
        <div className="bg-white/80 backdrop-blur-md border border-[#c5c6cd]/30 rounded-xl p-4 flex justify-between items-center shadow-sm">
          <div>
            <p className="text-[11px] font-medium text-[#45474c] mb-0.5">
              篩選總估值 ({selectedCategory === 'all' ? '全部' : categoriesList.find(c => c.id === selectedCategory)?.label})
            </p>
            <p className="text-xl font-bold text-[#091426] tracking-tight font-sans">
              NT$ {liveFilteredTotal.toLocaleString('zh-TW')}
            </p>
          </div>
          <div className="bg-[#fed65b]/20 p-2.5 rounded-full border border-[#fed65b]/30">
            <span className="material-symbols-outlined text-[#735c00] material-symbols-filled text-xl">
              analytics
            </span>
          </div>
        </div>
      </section>

      {/* Dynamic Collection Grid System */}
      {filteredCollectibles.length > 0 ? (
        <section className="grid grid-cols-2 gap-3 pt-1">
          {filteredCollectibles.map((item) => (
            <div
              key={item.id}
              onClick={() => onViewItem(item)}
              className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-[#c5c6cd]/20 shadow-xs hover:shadow-md transition-all active:scale-95 duration-200 cursor-pointer"
            >
              <div className="aspect-square relative overflow-hidden bg-[#eceef0]">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                
                {/* Visual Label overlays */}
                {item.countLabel && (
                  <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-[#091426]/90 backdrop-blur-md rounded text-[9px] text-white font-semibold">
                    {item.countLabel}
                  </div>
                )}
                
                {item.isRare && (
                  <div className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#735c00] text-white rounded text-[9px] font-semibold flex items-center gap-0.5 shadow-sm">
                    ★ 稀有
                  </div>
                )}
              </div>
              
              <div className="p-3 space-y-1 flex-1 flex flex-col justify-between">
                <h3 className="text-xs font-bold text-[#091426] truncate font-sans group-hover:text-[#735c00]">
                  {item.name}
                </h3>
                <div className="flex justify-between items-baseline pt-0.5">
                  <span className="text-[10px] text-[#45474c] bg-[#eceef0] px-1.5 py-0.5 rounded-sm">
                    {getCategoryChinese(item.category)}
                  </span>
                  <span className="text-xs font-bold text-[#735c00] font-sans">
                    NT$ {item.price.toLocaleString('zh-TW')}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 bg-[#eceef0] rounded-full flex items-center justify-center mb-3">
            <span className="material-symbols-outlined text-3xl text-[#75777d]">
              search_off
            </span>
          </div>
          <p className="text-sm font-semibold text-[#45474c]">無相符收藏項目</p>
          <p className="text-xs text-[#75777d] mt-1 pr-4 pl-4 max-w-xs">
            找不到符合「{searchQuery}」的項目。您可以重新輸入關鍵字或新增一個藏品！
          </p>
        </div>
      )}

      {/* Embedded Floating Action Button to Add New Item */}
      <button 
        onClick={onOpenAddModal}
        className="fixed bottom-24 right-5 w-14 h-14 bg-[#091426] text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl active:scale-90 transition-all z-30 cursor-pointer group"
      >
        <span className="material-symbols-outlined text-[28px] transition-transform group-hover:rotate-90 duration-300">
          add
        </span>
      </button>
    </div>
  );
};
export default CollectionTab;
