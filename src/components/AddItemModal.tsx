import React, { useState, useEffect } from 'react';
import { PRESET_IMAGES } from '../initialData';

interface AddItemModalProps {
  onClose: () => void;
  onSubmit: (item: {
    name: string;
    category: string;
    price: number;
    purchaseDate: string;
    source: string;
    notes: string;
    isRare: boolean;
    imageUrl: string;
  }) => void;
  prepopulatedUrl?: string;
}

export const AddItemModal: React.FC<AddItemModalProps> = ({
  onClose,
  onSubmit,
  prepopulatedUrl = '',
}) => {
  // Form fields state
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState<number | ''>('');
  const [purchaseDate, setPurchaseDate] = useState('');
  const [source, setSource] = useState('');
  const [notes, setNotes] = useState('');
  const [isRare, setIsRare] = useState(false);
  const [imageUrl, setImageUrl] = useState('');
  
  // Custom states for helper flow
  const [isSelectedPresetTab, setIsSelectedPresetTab] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPresetLibrary, setShowPresetLibrary] = useState(false);

  // Initialize prepopulated data
  useEffect(() => {
    if (prepopulatedUrl) {
      setImageUrl(prepopulatedUrl);
    } else {
      // Pick a default generic image from presets
      setImageUrl(PRESET_IMAGES[2].url); // Perfume bottle default
    }
    // Set default date to today
    const today = new Date().toISOString().split('T')[0];
    setPurchaseDate(today);
  }, [prepopulatedUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    if (!category) return;

    setIsSubmitting(true);
    setTimeout(() => {
      onSubmit({
        name: name.trim(),
        category,
        price: price === '' ? 0 : Number(price),
        purchaseDate: purchaseDate || new Date().toISOString().split('T')[0],
        source: source.trim() || '自主登錄收藏',
        notes: notes.trim(),
        isRare,
        imageUrl: imageUrl || PRESET_IMAGES[0].url,
      });
      setIsSubmitting(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#091426]/60 backdrop-blur-md flex justify-center overflow-y-auto no-scrollbar outline-none">
      <div className="w-full max-w-md bg-[#f7f9fb] min-h-screen pb-32 relative shadow-2xl flex flex-col">
        {/* Sticky Top App Bar */}
        <header className="sticky top-0 w-full z-10 bg-[#f7f9fb] border-b border-[#eceef0] flex justify-between items-center px-4 h-16">
          <button 
            type="button"
            onClick={onClose}
            className="material-symbols-outlined text-[#091426] hover:bg-[#eceef0] p-2 rounded-full transition-colors active:scale-95 cursor-pointer text-xl"
          >
            close
          </button>
          <h1 className="text-base font-bold text-[#091426] tracking-tight font-sans">
            新增收藏項目
          </h1>
          <div className="w-10"></div> {/* Spacer for central optical alignment */}
        </header>

        {/* Form Body container */}
        <main className="px-4 py-4 flex-1">
          {/* Photo upload / Preset image picker card container */}
          <section className="mb-4">
            <div className="relative group aspect-square rounded-xl overflow-hidden border-2 border-dashed border-[#c5c6cd] hover:border-[#091426] bg-[#eceef0] flex flex-col items-center justify-center text-[#45474c] transition-colors cursor-pointer">
              {imageUrl ? (
                <>
                  <img 
                    src={imageUrl} 
                    alt="藏品預覽" 
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/40 hover:bg-black/50 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center transition-opacity text-white gap-2">
                    <span className="material-symbols-outlined text-3xl">photo_library</span>
                    <span className="text-xs font-semibold">點擊切換極高清預置圖</span>
                  </div>
                </>
              ) : (
                <div className="text-center p-4">
                  <span className="material-symbols-outlined text-4xl mb-2 text-[#45474c]/80">add_a_photo</span>
                  <p className="text-xs font-semibold">點擊點選極精美收藏原畫</p>
                </div>
              )}
              {/* Invisible Click Overlay and Action Drawer toggler */}
              <button 
                type="button" 
                onClick={() => setShowPresetLibrary(!showPresetLibrary)} 
                className="absolute inset-0 w-full h-full cursor-pointer opacity-0 z-10" 
              />
            </div>
          </section>

          {/* Preset image selector popover tray */}
          {showPresetLibrary && (
            <div className="bg-white border text-xs border-[#c5c6cd]/50 rounded-xl p-3 mb-4 space-y-2 shadow-xs transition-all animate-fadeIn">
              <div className="flex justify-between items-center pb-1 border-b border-[#eceef0]">
                <span className="font-bold text-[#091426]">可供選用的經典超清原畫（共 {PRESET_IMAGES.length} 幅）：</span>
                <button 
                  onClick={() => setShowPresetLibrary(false)} 
                  className="material-symbols-outlined text-sm hover:text-[#091426] text-[#75777d] cursor-pointer"
                >
                  close
                </button>
              </div>
              <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto no-scrollbar pt-1">
                {PRESET_IMAGES.map((preset, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setImageUrl(preset.url);
                      setShowPresetLibrary(false);
                    }}
                    className={`flex items-center gap-2 p-1 border rounded-lg hover:bg-[#eceef0] transition-colors cursor-pointer ${
                      imageUrl === preset.url ? 'border-[#0a1527] bg-[#eceef0]/30 font-semibold' : 'border-[#c5c6cd]/30'
                    }`}
                  >
                    <img 
                      src={preset.url} 
                      alt={preset.name} 
                      referrerPolicy="no-referrer"
                      className="w-10 h-10 object-cover rounded-md" 
                    />
                    <span className="text-[10px] text-left truncate">{preset.name}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Form component segment */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Custom URL text input auxiliary */}
            <div className="space-y-1">
              <label className="block text-xs font-bold text-[#45474c] px-1">
                自定義圖片網址（可選）
              </label>
              <input 
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                placeholder="請輸入網路公開的圖片連結，或用上方預置圖"
                className="w-full bg-white border border-[#c5c6cd] rounded-xl px-4 py-2.5 text-xs text-[#091426] focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none"
              />
            </div>

            {/* Collectible Name */}
            <div className="space-y-1">
              <label htmlFor="itemName" className="block text-xs font-bold text-[#45474c] px-1">
                收藏品名稱 <span className="text-red-500">*</span>
              </label>
              <input 
                id="itemName"
                required
                type="text"
                placeholder="例如: 1/100 比例模型, 限量特裝腕錶"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white border border-[#c5c6cd] rounded-xl px-4 py-3 text-xs text-[#091426] focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none"
              />
            </div>

            {/* Category Dropdown option selector */}
            <div className="space-y-1">
              <label htmlFor="category" className="block text-xs font-bold text-[#45474c] px-1">
                分類 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  id="category"
                  required
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full appearance-none bg-white border border-[#c5c6cd] rounded-xl px-4 py-3 text-xs text-[#091426] focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none"
                >
                  <option value="" disabled>請選擇分類</option>
                  <option value="model">模型</option>
                  <option value="album">專輯</option>
                  <option value="card">小卡</option>
                  <option value="perfume">香水</option>
                  <option value="figure">公仔</option>
                  <option value="watch">腕錶</option>
                </select>
                <span className="material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#45474c] text-xl">
                  expand_more
                </span>
              </div>
            </div>

            {/* Two col: Price & Date */}
            <div className="grid grid-cols-2 gap-3">
              {/* Purchase Price */}
              <div className="space-y-1">
                <label htmlFor="price" className="block text-xs font-bold text-[#45474c] px-1">
                  購買價格 (NT$)
                </label>
                <div className="relative">
                  <input 
                    id="price"
                    type="number"
                    min="0"
                    placeholder="0"
                    value={price}
                    onChange={(e) => setPrice(e.target.value === '' ? '' : Number(e.target.value))}
                    className="w-full bg-white border border-[#c5c6cd] rounded-xl pl-8 pr-4 py-3 text-xs text-[#091426] focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none font-sans"
                  />
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#45474c] text-xs font-bold font-sans">
                    $
                  </span>
                </div>
              </div>

              {/* Purchase Date */}
              <div className="space-y-1">
                <label htmlFor="date" className="block text-xs font-bold text-[#45474c] px-1">
                  購買日期
                </label>
                <input 
                  id="date"
                  type="date"
                  value={purchaseDate}
                  onChange={(e) => setPurchaseDate(e.target.value)}
                  className="w-full bg-white border border-[#c5c6cd] rounded-xl px-4 py-3 text-xs text-[#091426] focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none font-sans"
                />
              </div>
            </div>

            {/* Source */}
            <div className="space-y-1">
              <label htmlFor="source" className="block text-xs font-bold text-[#45474c] px-1">
                來源
              </label>
              <input 
                id="source"
                type="text"
                placeholder="例如: 官方商城、實體門市、秋葉原會館"
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="w-full bg-white border border-[#c5c6cd] rounded-xl px-4 py-3 text-xs text-[#091426] focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none"
              />
            </div>

            {/* Notes */}
            <div className="space-y-1">
              <label htmlFor="notes" className="block text-xs font-bold text-[#45474c] px-1">
                備註
              </label>
              <textarea 
                id="notes"
                rows={3}
                placeholder="可詳細描述收藏品目前的狀況、限量發行編號、品相評級等重要細節..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full bg-white border border-[#c5c6cd] rounded-xl px-4 py-3 text-xs text-[#091426] min-h-16 resize-none focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none"
              />
            </div>

            {/* Rare item checkbox status banner */}
            <div className="bg-[#f2f4f6]/60 border border-[#c5c6cd]/30 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#735c00] material-symbols-filled">
                  stars
                </span>
                <span className="text-xs font-semibold text-[#091426]">
                  這是一個稀有品項 (Rare Collectible)
                </span>
              </div>
              <input 
                type="checkbox"
                checked={isRare}
                onChange={(e) => setIsRare(e.target.checked)}
                className="w-5 h-5 rounded-md border-[#c5c6cd] text-[#0a1527] focus:ring-[#0a1527]/30 focus:ring-1 cursor-pointer"
              />
            </div>

            {/* Submission Elevated Button Area (Matches high-density bottom bar) */}
            <div className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-[#eceef0]/80 px-4 py-3 pb-8 shadow-[0_-8px_20px_rgba(9,20,38,0.06)] z-20 flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#091426] hover:bg-[#091426]/90 text-white font-semibold text-sm py-4 rounded-full flex items-center justify-center gap-2 active:scale-95 transition-all shadow-lg shadow-[#091426]/20 cursor-pointer disabled:bg-[#091426]/80 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <span className="material-symbols-outlined animate-spin text-lg">
                      progress_activity
                    </span>
                    正在保管並向網路保險庫同步註冊...
                  </>
                ) : (
                  <>
                    <span className="material-symbols-outlined text-lg">
                      check_circle
                    </span>
                    確認登錄
                  </>
                )}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};
export default AddItemModal;
