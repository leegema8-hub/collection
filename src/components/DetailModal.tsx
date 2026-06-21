import React, { useState } from 'react';
import { CollectibleItem } from '../types';
import { getCategoryChinese, formatCurrency, formatDate } from '../utils';

interface DetailModalProps {
  item: CollectibleItem;
  onClose: () => void;
  onDelete: (id: string) => void;
}

export const DetailModal: React.FC<DetailModalProps> = ({ item, onClose, onDelete }) => {
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);

  const handleDeleteTrigger = () => {
    onDelete(item.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#091426]/75 backdrop-blur-md flex justify-center items-end sm:items-center p-0 sm:p-4 outline-none">
      {/* Background click to close */}
      <button 
        type="button"
        onClick={onClose} 
        className="absolute inset-0 w-full h-full cursor-default bg-transparent outline-none border-none" 
      />

      {/* Main modal container card */}
      <div className="w-full max-w-md bg-white rounded-t-2xl sm:rounded-2xl overflow-hidden shadow-2xl relative z-10 max-h-[85vh] flex flex-col animate-slideUp">
        
        {/* Aspect Ratio Header Photo */}
        <div className="relative h-64 w-full bg-[#eceef0] flex-shrink-0">
          <img 
            src={item.imageUrl} 
            alt={item.name} 
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          {/* Overlay Buttons */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 active:scale-95 transition-all text-sm cursor-pointer border-none flex items-center justify-center h-8 w-8"
          >
            <span className="material-symbols-outlined text-base font-bold">close</span>
          </button>

          {item.isRare && (
            <div className="absolute bottom-4 left-4 bg-[#fed65b] text-[#241a00] px-3 py-1 rounded-full text-xs font-bold border border-[#fed65b]/50 shadow-md flex items-center gap-1">
              <span className="material-symbols-outlined text-[14px] material-symbols-filled text-[#735c00]">
                stars
              </span>
              <span>高價值 稀有級</span>
            </div>
          )}

          {item.countLabel && (
            <div className="absolute bottom-4 right-4 bg-[#091426]/80 backdrop-blur-md text-white px-2.5 py-1 rounded-lg text-[10px] font-bold">
              系列標識: {item.countLabel}
            </div>
          )}
        </div>

        {/* Modal Scrollable pedigree listing body */}
        <div className="p-5 space-y-4 overflow-y-auto no-scrollbar flex-1 pb-16">
          <div className="space-y-1">
            <span className="text-[10px] uppercase tracking-wide text-[#75777d] font-bold">
              {getCategoryChinese(item.category)} 項目證書
            </span>
            <h2 className="text-lg font-bold text-[#091426] tracking-tight font-sans">
              {item.name}
            </h2>
          </div>

          <div className="border-t border-[#eceef0]/80 pt-3">
            <h3 className="text-xs font-bold text-[#091426] mb-2 font-sans flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">info</span>
              證件 pedigree 詳情
            </h3>
            <div className="bg-[#f2f4f6]/60 border border-[#c5c6cd]/25 rounded-xl text-xs overflow-hidden divide-y divide-[#c5c6cd]/20 font-sans">
              <div className="flex justify-between items-center p-3">
                <span className="text-[#45474c] font-medium">收藏估算價格</span>
                <span className="font-bold text-[#735c00]">
                  {formatCurrency(item.price)}
                </span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span className="text-[#45474c] font-medium">入手地點渠道</span>
                <span className="font-semibold text-[#091426]">{item.source || '自主登錄'}</span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span className="text-[#45474c] font-medium">登陸購買日期</span>
                <span className="font-medium text-[#45474c]">{formatDate(item.purchaseDate)}</span>
              </div>
              <div className="flex justify-between items-center p-3">
                <span className="text-[#45474c] font-medium">系統保號 UUID</span>
                <span className="font-mono text-[9px] text-[#75777d]/90 uppercase select-all">
                  {item.id}
                </span>
              </div>
            </div>
          </div>

          {item.notes && (
            <div className="space-y-1.5 pt-1">
              <h3 className="text-xs font-bold text-[#091426] font-sans flex items-center gap-1">
                <span className="material-symbols-outlined text-sm">description</span>
                收藏家備註札記
              </h3>
              <p className="text-xs text-[#45474c]/90 leading-relaxed bg-[#f2f4f6]/20 py-2.5 px-3 rounded-lg border border-[#eceef0] font-sans">
                {item.notes}
              </p>
            </div>
          )}
        </div>

        {/* Action Tray at the bottom */}
        <div className="absolute bottom-0 left-0 w-full bg-white border-t border-[#eceef0]/80 px-4 py-3 flex justify-between items-center gap-3 shadow-md z-10">
          {showConfirmDelete ? (
            <div className="w-full flex items-center justify-between gap-2 animate-fadeIn bg-red-50 p-2 rounded-xl border border-red-200">
              <span className="text-[10px] text-red-600 font-semibold pl-1">確定要永久銷毀此記錄嗎？</span>
              <div className="flex gap-1">
                <button
                  onClick={() => setShowConfirmDelete(false)}
                  className="bg-white border text-[10px] font-bold px-2.5 py-1.5 rounded-lg text-[#091426] cursor-pointer"
                >
                  取消
                </button>
                <button
                  onClick={handleDeleteTrigger}
                  className="bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold px-2.5 py-1.5 rounded-lg cursor-pointer"
                >
                  確認銷毀
                </button>
              </div>
            </div>
          ) : (
            <>
              <button
                onClick={() => setShowConfirmDelete(true)}
                className="text-xs text-red-500 hover:text-red-700 font-semibold p-2 flex items-center gap-1 cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">delete</span>
                刪除此項
              </button>
              
              <button
                onClick={onClose}
                className="bg-[#091426] hover:bg-[#091426]/90 text-white text-xs font-semibold px-6 py-2.5 rounded-full cursor-pointer hover:shadow-sm active:scale-95 transition-all font-sans"
              >
                關閉證書
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default DetailModal;
