import React, { useState } from 'react';
import { WishlistItem } from '../types';
import { getCategoryChinese, formatCurrency } from '../utils';

interface WishlistTabProps {
  wishlist: WishlistItem[];
  onMoveToCollection: (item: WishlistItem) => void;
  onDeleteWish: (id: string) => void;
  onRestoreDefaults: () => void;
}

export const WishlistTab: React.FC<WishlistTabProps> = ({
  wishlist,
  onMoveToCollection,
  onDeleteWish,
  onRestoreDefaults,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('all');

  // Filter computations
  const filteredList = wishlist.filter((item) => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'high') return item.priority === 'high';
    return item.category === selectedFilter;
  });

  // Dynamic budget/balance indicator
  const totalBudget = wishlist.reduce((sum, item) => sum + item.estimatedPrice, 0);

  return (
    <div className="space-y-5 pb-24">
      {/* Header Info & Stats Summary */}
      <div className="flex justify-between items-end mt-2">
        <div>
          <h2 className="text-lg font-bold text-[#091426] font-sans">心願單</h2>
          <p className="text-[11px] font-medium text-[#45474c] mt-0.5">
            共 {wishlist.length} 件心儀珍品
          </p>
        </div>
        
        {wishlist.length > 0 && (
          <div className="bg-[#fed65b]/20 px-3 py-1 rounded-full flex items-center gap-1 border border-[#fed65b]/40">
            <span className="material-symbols-outlined text-sm font-bold text-[#745c00] material-symbols-filled">
              payments
            </span>
            <span className="text-[11px] font-bold text-[#745c00] font-sans">
              預計需: ${totalBudget.toLocaleString('zh-TW')}
            </span>
          </div>
        )}
      </div>

      {/* Filter Chips row */}
      {wishlist.length > 0 && (
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
          {[
            { id: 'all', label: '全部' },
            { id: 'high', label: '高優先級' },
            { id: 'model', label: '模型' },
            { id: 'perfume', label: '香水' },
            { id: 'album', label: '專輯' },
          ].map((chip) => {
            const isSel = selectedFilter === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => setSelectedFilter(chip.id)}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full font-sans text-xs tracking-tight transition-all duration-200 cursor-pointer border ${
                  isSel
                    ? 'bg-[#091426] text-white border-[#091426] font-semibold shadow-xs'
                    : 'bg-[#eceef0] text-[#45474c] hover:bg-[#e0e3e5] border-transparent'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      )}

      {/* Grid of Wishlist items */}
      {filteredList.length > 0 ? (
        <div className="space-y-4">
          {filteredList.map((item) => {
            const isHighPriority = item.priority === 'high';

            // High Priority renders as high-impact hero Bento cards
            if (isHighPriority && selectedFilter === 'all') {
              return (
                <div 
                  key={item.id}
                  className="bg-white border border-[#c5c6cd]/35 rounded-2xl overflow-hidden shadow-xs flex flex-col hover:shadow-md transition-all duration-300"
                >
                  <div className="relative h-48 w-full bg-[#eceef0]">
                    <img 
                      src={item.imageUrl} 
                      alt={item.name} 
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3 bg-[#fed65b] text-[#241a00] px-2.5 py-0.5 rounded-lg flex items-center gap-1 text-[10px] font-bold border border-[#fed65b]/50">
                      <span className="material-symbols-outlined text-[13px] material-symbols-filled">
                        star
                      </span>
                      <span>最高優先</span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col gap-3">
                    <div className="flex justify-between items-start gap-2">
                      <div>
                        <h3 className="text-sm font-bold text-[#091426] font-sans">
                          {item.name}
                        </h3>
                        {item.notes && (
                          <p className="text-[11px] text-[#45474c] mt-1 line-clamp-2">
                            {item.notes}
                          </p>
                        )}
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-[9px] font-medium text-[#45474c]/80">預計價格</p>
                        <p className="text-sm font-bold text-[#735c00] font-sans whitespace-nowrap mt-0.5">
                          ${item.estimatedPrice.toLocaleString('zh-TW')}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 border-t border-[#eceef0]/60 pt-3 mt-1">
                      <button 
                        onClick={() => onMoveToCollection(item)}
                        className="flex-1 bg-[#091426] hover:bg-[#091426]/90 text-white py-2 rounded-full text-xs font-semibold flex justify-center items-center gap-1.5 active:scale-95 transition-all cursor-pointer shadow-xs"
                      >
                        <span className="material-symbols-outlined text-[#bcc7de] text-sm font-semibold">
                          inventory_2
                        </span>
                        轉入收藏
                      </button>
                      
                      <button 
                        onClick={() => onDeleteWish(item.id)}
                        className="w-9 h-9 border border-[#c5c6cd]/50 rounded-full flex items-center justify-center text-[#75777d] hover:bg-[#eceef0] active:scale-95 transition-all cursor-pointer hover:text-red-600 hover:border-red-200"
                        title="刪除願望"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Normal elements render as clean inline compact rows (efficient & elegant)
            return (
              <div 
                key={item.id}
                className="bg-white border border-[#c5c6cd]/30 rounded-xl p-3 flex gap-3 shadow-xs items-center hover:shadow-sm transition-all"
              >
                <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-[#eceef0]">
                  <img 
                    src={item.imageUrl} 
                    alt={item.name} 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 flex flex-col justify-between h-16">
                  <div className="flex justify-between items-start gap-1">
                    <h3 className="text-xs font-bold text-[#091426] line-clamp-1">
                      {item.name}
                    </h3>
                    <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded ${
                      item.priority === 'high' 
                        ? 'bg-red-50 text-red-600' 
                        : item.priority === 'medium' 
                        ? 'bg-amber-50 text-amber-600' 
                        : 'bg-slate-50 text-slate-500'
                    }`}>
                      {item.priority === 'high' ? '高' : item.priority === 'medium' ? '中' : '低'}優先
                    </span>
                  </div>

                  <div className="flex justify-between items-end mt-1">
                    <span className="text-[11px] font-medium text-[#45474c] font-sans">
                      預估: ${item.estimatedPrice.toLocaleString('zh-TW')}
                    </span>
                    
                    <div className="flex items-center gap-1.5">
                      <button 
                        onClick={() => onMoveToCollection(item)}
                        className="text-[#091426] hover:text-[#735c00] flex items-center gap-0.5 text-[11px] font-bold hover:underline cursor-pointer"
                      >
                        <span className="material-symbols-outlined text-[15px]">
                          add_circle
                        </span>
                        轉入
                      </button>
                      <button 
                        onClick={() => onDeleteWish(item.id)}
                        className="text-red-500 hover:text-red-700 p-0.5 cursor-pointer flex items-center"
                        title="刪除"
                      >
                        <span className="material-symbols-outlined text-base">
                          delete
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Empty State */
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-4">
          <div className="w-20 h-20 bg-[#eceef0] rounded-full flex items-center justify-center text-[#75777d]">
            <span className="material-symbols-outlined text-[44px]">
              sentiment_satisfied
            </span>
          </div>
          <p className="text-sm font-semibold text-[#45474c]">
            {wishlist.length === 0 ? '心願單目前是空的喔' : '無此優先級的心願項目'}
          </p>
          <p className="text-xs text-[#75777d] max-w-xs pr-4 pl-4">
            點擊下方「還原預設藏品與心願」即可重新載入高解析度的預熱願望！
          </p>
          <button 
            onClick={onRestoreDefaults}
            className="bg-[#091426] hover:bg-[#091426]/90 text-white font-semibold text-xs px-6 py-2.5 rounded-full active:scale-95 transition-all cursor-pointer shadow-sm"
          >
            尋找熱門藏品預置
          </button>
        </div>
      )}
    </div>
  );
};
export default WishlistTab;
