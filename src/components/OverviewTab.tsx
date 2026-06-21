import React, { useState } from 'react';
import { CollectibleItem } from '../types';
import { formatCompactCurrency, getCategoryChinese } from '../utils';

interface OverviewTabProps {
  collectibles: CollectibleItem[];
  onOpenAddModal: (prepopulatedUrl?: string) => void;
  onViewItem: (item: CollectibleItem) => void;
  onShowToast: (message: string) => void;
}

export const OverviewTab: React.FC<OverviewTabProps> = ({
  collectibles,
  onOpenAddModal,
  onViewItem,
  onShowToast,
}) => {
  const [showQrMock, setShowQrMock] = useState(false);
  const [isScanning, setIsScanning] = useState(false);

  // Math synchronization with mockup
  const baseCount = 1275;
  const currentCount = baseCount + collectibles.length;

  const basePrice = 40161500;
  const currentPriceSum = collectibles.reduce((sum, item) => sum + item.price, 0);
  const totalValue = basePrice + currentPriceSum;

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: '我的收藏家助手',
        text: `我目前收集了 ${currentCount} 件精美藏品，估計總值已達 ${formatCompactCurrency(totalValue)}！`,
        url: window.location.href,
      }).catch(() => {
        onShowToast('感謝分享！收藏摘要連結已複製到您的剪貼簿');
      });
    } else {
      navigator.clipboard.writeText(`【收藏家助手】我目前已登錄 ${currentCount} 件收藏，總累計價值 ${formatCompactCurrency(totalValue)}！邀請您一同鑑賞。`);
      onShowToast('分享連結與收藏資訊已成功複製到您的剪貼簿！');
    }
  };

  const startMockScan = () => {
    setIsScanning(true);
    setShowQrMock(true);
    setTimeout(() => {
      setIsScanning(false);
      setShowQrMock(false);
      onShowToast('🔍 已成功偵測到收藏二維碼！此功能整合系統，您可以手動載入條碼資訊！');
      onOpenAddModal();
    }, 2200);
  };

  // Preset sample items for display
  const recentItems = collectibles.slice(0, 5);

  return (
    <div className="space-y-6 pb-24">
      {/* Overview header section */}
      <div className="flex items-center justify-between mt-2">
        <h2 className="text-lg font-bold text-[#091426] font-sans">概覽</h2>
        <span className="text-xs font-medium text-[#45474c] bg-[#eceef0] rounded-full px-3 py-1">
          更新於 10 分鐘前
        </span>
      </div>

      {/* Stats Bento Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* Total Count Card */}
        <div 
          onClick={() => onShowToast(`您總共登錄了 ${collectibles.length} 件專屬珍品，加上倉庫歷史保管檔計 ${currentCount} 件物資。`)}
          className="p-4 rounded-2xl bg-[#091426] text-white shadow-sm flex flex-col justify-between aspect-square cursor-pointer active:scale-95 transition-all group"
        >
          <div className="flex justify-between items-start">
            <span className="material-symbols-outlined text-white/80 text-2xl material-symbols-filled">
              inventory_2
            </span>
            <span className="text-[11px] font-semibold bg-white/20 text-white/90 px-2 py-0.5 rounded-full">
              +12%
            </span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-white/70 mb-0.5">總收藏數</p>
            <p className="text-2xl font-bold tracking-tight font-sans transition-all group-hover:translate-x-1">
              {currentCount.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Total Value Card */}
        <div 
          onClick={() => onShowToast(`本預估資產總額隨時因市場供需、稀有度變化而調增（目前基礎累積: ${formatCompactCurrency(totalValue)}）`)}
          className="p-4 rounded-2xl bg-white border border-[#c5c6cd]/30 shadow-sm flex flex-col justify-between aspect-square cursor-pointer active:scale-95 transition-all group"
        >
          <div className="flex justify-between items-start text-[#735c00]">
            <span className="material-symbols-outlined text-[26px] material-symbols-filled text-[#735c00]">
              payments
            </span>
            <span className="text-[11px] font-medium bg-[#fed65b]/20 px-2 py-0.5 rounded-full text-[#735c00] border border-[#fed65b]/40">
              Est.
            </span>
          </div>
          <div>
            <p className="text-[11px] font-medium text-[#45474c] mb-0.5">總價值</p>
            <p className="text-2xl font-bold tracking-tight text-[#091426] font-sans transition-all group-hover:translate-x-1">
              {formatCompactCurrency(totalValue)}
            </p>
          </div>
        </div>
      </div>

      {/* Quick Action Section */}
      <section className="space-y-3">
        <h3 className="text-[15px] font-bold text-[#091426] tracking-tight">快速操作</h3>
        <div className="grid grid-cols-4 gap-2">
          {/* Action 1 */}
          <button 
            onClick={() => onOpenAddModal('https://lh3.googleusercontent.com/aida-public/AB6AXuB6n7lVaPcNz5WxmwIPayK03Os35vxvyKjuEAJJ2SQmj2CKm16sGuVnjPi1SBuNP8vQGED1uxZF6_rxIr7OJ0a7G0jpEwXlAHYPxmgTVbDRdFm95RLV0jCHbwrgi0Co5b1ORkYp3t4KtpveL-GkwqnQvROU17F5LtvWQbgjuQudKirxlifJ2_M9iwWOVvDG2iiU9MAE-dieqfhU3H9XuunKyyk8xhA4KdbS2a5Vx61btW6-dN5JxYARJBYdfFnCdBV5jkLeXtv9Wg')}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#d8e3fb] hover:bg-[#d8e3fb]/80 flex items-center justify-center text-[#111c2d] group-active:scale-90 transition-all shadow-sm">
              <span className="material-symbols-outlined text-xl">add_a_photo</span>
            </div>
            <span className="text-xs font-medium text-[#45474c]">拍照新增</span>
          </button>

          {/* Action 2 */}
          <button 
            onClick={startMockScan}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#eceef0] hover:bg-[#eceef0]/80 flex items-center justify-center text-[#091426] group-active:scale-90 transition-all shadow-sm">
              <span className="material-symbols-outlined text-xl">barcode_scanner</span>
            </div>
            <span className="text-xs font-medium text-[#45474c]">掃碼</span>
          </button>

          {/* Action 3 */}
          <button 
            onClick={() => onOpenAddModal()}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#eceef0] hover:bg-[#eceef0]/80 flex items-center justify-center text-[#091426] group-active:scale-90 transition-all shadow-sm">
              <span className="material-symbols-outlined text-xl">edit_note</span>
            </div>
            <span className="text-xs font-medium text-[#45474c]">手動輸入</span>
          </button>

          {/* Action 4 */}
          <button 
            onClick={handleShare}
            className="flex flex-col items-center gap-1.5 cursor-pointer group"
          >
            <div className="w-12 h-12 rounded-full bg-[#eceef0] hover:bg-[#eceef0]/80 flex items-center justify-center text-[#091426] group-active:scale-90 transition-all shadow-sm">
              <span className="material-symbols-outlined text-xl">share</span>
            </div>
            <span className="text-xs font-medium text-[#45474c]">分享</span>
          </button>
        </div>
      </section>

      {/* Mini Bar Chart Section */}
      <section className="bg-white p-4 rounded-2xl border border-[#c5c6cd]/30 shadow-sm space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#091426] material-symbols-filled">monitoring</span>
            <h3 className="text-sm font-bold text-[#091426] tracking-tight">數據趨勢</h3>
          </div>
          <span className="material-symbols-outlined text-[#75777d] text-base">trending_up</span>
        </div>

        {/* Dynamic customized SVG graph bar view */}
        <div className="h-28 flex items-end justify-between px-1 gap-2 pt-2">
          {[
            { value: 35, label: '一', height: 'h-[35%]', bg: 'bg-[#eceef0]' },
            { value: 50, label: '二', height: 'h-[50%]', bg: 'bg-[#eceef0]' },
            { value: 80, label: '三', height: 'h-[80%]', bg: 'bg-[#091426]' },
            { value: 45, label: '四', height: 'h-[45%]', bg: 'bg-[#eceef0]' },
            { value: 65, label: '五', height: 'h-[65%]', bg: 'bg-[#eceef0]' },
            { value: 40, label: '六', height: 'h-[40%]', bg: 'bg-[#eceef0]' },
            { value: 95, label: '日', height: 'h-[95%]', bg: 'bg-[#28a094]' },
          ].map((bar, idx) => (
            <div key={idx} className="flex-1 flex flex-col items-center gap-1 group relative">
              {/* Tooltip on hover */}
              <div className="absolute bottom-full mb-1 bg-[#1e293b] text-white text-[10px] py-0.5 px-1.5 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                增長: {bar.value}%
              </div>
              <div className={`w-full ${bar.height} ${bar.bg} rounded-t-md transition-all duration-500 group-hover:brightness-95`} />
              <span className="text-[10px] font-medium text-[#75777d]/80">{bar.label}</span>
            </div>
          ))}
        </div>
        <p className="text-center text-[11px] font-medium text-[#75777d] border-t border-[#eceef0]/60 pt-2 font-sans">
          本週預期收藏增長趨勢表
        </p>
      </section>

      {/* Recent Arrivals Carousel with custom swipe container */}
      <section className="space-y-3">
        <div className="flex justify-between items-center">
          <h2 className="text-[15px] font-bold text-[#091426] tracking-tight">最近新增</h2>
          <span className="text-[11px] font-medium text-[#45474c] bg-[#eceef0] px-2.5 py-0.5 rounded-full">
            最新
          </span>
        </div>

        <div className="flex overflow-x-auto gap-4 pb-2 no-scrollbar scroll-smooth snap-x">
          {recentItems.map((item) => (
            <div 
              key={item.id} 
              onClick={() => onViewItem(item)}
              className="snap-start flex-shrink-0 w-40 space-y-2 cursor-pointer group"
            >
              <div className="aspect-square w-40 rounded-xl overflow-hidden shadow-sm relative bg-[#eceef0]">
                <img 
                  src={item.imageUrl} 
                  alt={item.name} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {item.countLabel && (
                  <span className="absolute top-2 right-2 bg-black/70 backdrop-blur-md text-[9px] text-white font-bold px-1.5 py-0.5 rounded">
                    {item.countLabel}
                  </span>
                )}
                {item.isRare && (
                  <span className="absolute top-2 left-2 bg-[#fed65b] text-[#241a00] text-[9px] font-bold px-1.5 py-0.5 rounded border border-[#fed65b]/50">
                    ★ 稀有
                  </span>
                )}
              </div>
              <div className="px-0.5">
                <h4 className="text-xs font-semibold text-[#091426] truncate font-sans group-hover:text-[#735c00] transition-colors">
                  {item.name}
                </h4>
                <p className="text-[10px] text-[#45474c] mt-0.5">
                  型態: {getCategoryChinese(item.category)}
                </p>
                <p className="text-xs font-bold text-[#735c00] mt-0.5 font-sans">
                  NT$ {item.price.toLocaleString('zh-TW')}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* QR/Barcode scanner Mock HUD Modal */}
      {showQrMock && (
        <div className="fixed inset-0 bg-[#091426]/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center p-6 text-white transition-opacity duration-300">
          <div className="relative w-64 h-64 border-2 border-dashed border-[#28a094] rounded-2xl flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#28a094]/10 to-transparent animate-pulse" />
            <span className="material-symbols-outlined text-[72px] text-[#28a094]/80 animate-bounce">
              barcode_scanner
            </span>
            {isScanning && (
              <div className="absolute left-0 right-0 h-1 bg-[#28a094] top-0 animate-[infinite-scroll_2s_ease-in-out_infinite]" style={{
                animation: 'scanLine 2s infinite ease-in-out'
              }} />
            )}
          </div>
          <style>{`
            @keyframes scanLine {
              0% { top: 0%; }
              50% { top: 100%; }
              100% { top: 0%; }
            }
          `}</style>
          <div className="mt-8 text-center space-y-2">
            <p className="font-bold text-[#dfdfdf] tracking-wider animate-pulse">
              對準條碼中...正在進行高級防偽圖像識別
            </p>
            <p className="text-xs text-white/50">
              支援 UPC、EAN 以及產品防偽雷射鋼印
            </p>
          </div>
          <button 
            onClick={() => setShowQrMock(false)}
            className="mt-8 bg-white/10 hover:bg-white/20 text-white font-medium text-xs px-5 py-2.5 rounded-full active:scale-95 transition-all text-center cursor-pointer"
          >
            取消掃描
          </button>
        </div>
      )}
    </div>
  );
};
export default OverviewTab;
