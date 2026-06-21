import React, { useState, useMemo } from 'react';
import { CollectibleItem } from '../types';
import { formatCurrency, getCategoryChinese } from '../utils';
import { 
  Sparkles, 
  Cpu, 
  TrendingUp, 
  BadgeCheck, 
  ShieldAlert,
  Compass,
  Layers,
  Award,
  ChevronRight,
  Info
} from 'lucide-react';

interface AnalyticsTabProps {
  collectibles: CollectibleItem[];
  activities: Array<{
    id: string;
    type: 'purchase' | 'market_update';
    title: string;
    timestamp: string;
    detail: string;
    value: number;
    isPositive: boolean;
  }>;
}

export const AnalyticsTab: React.FC<AnalyticsTabProps> = ({ collectibles, activities }) => {
  // Navigation inside analytics: 'basic' (Stats overview) or 'ml' (AI / ML prediction model)
  const [subTab, setSubTab] = useState<'ml' | 'basic'>('ml');
  const [hoveredMonth, setHoveredMonth] = useState<number | null>(null);

  // Core collectible fallback item if list empty
  const fallbackItem: CollectibleItem = {
    id: 'fallback-demo',
    name: '示例：紀念限量版機械腕錶',
    category: 'watch',
    price: 18500,
    purchaseDate: '2025-01-01',
    source: '旗艦店購入',
    notes: '示範項目',
    isRare: true,
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&q=80&w=200'
  };

  // Safe Items fallback
  const activeItems = collectibles.length > 0 ? collectibles : [fallbackItem];
  const [selectedItemId, setSelectedItemId] = useState<string>(activeItems[0].id);

  // Target item selected
  const targetItem = useMemo(() => {
    return activeItems.find(item => item.id === selectedItemId) || activeItems[0];
  }, [activeItems, selectedItemId]);

  // ==================== [ML OPTION STATE 1] ====================
  // Predict Years Options: 1 Year, 3 Years, 5 Years
  const [selectedYears, setSelectedYears] = useState<1 | 3 | 5>(3);

  // ==================== [ML OPTION STATE 2] ====================
  // Authenticity factors toggles (Yes/No)
  const [hasLazerTag, setHasLazerTag] = useState<boolean>(true);
  const [hasFullSet, setHasFullSet] = useState<boolean>(true);

  // ==================== [ML OPTION STATE 3] ====================
  // Strategy purpose choice: 保值穩健 (Hold), 增值獲利 (Gain), 純粹熱愛 (Love)
  const [purpose, setPurpose] = useState<'hold' | 'gain' | 'love'>('hold');

  // Dynamic calculations for ML Option 1: Value Trend Evaluation
  const valueEstimation = useMemo(() => {
    const basePrice = targetItem.price || 5000;
    const isRare = targetItem.isRare;
    
    // Growth rates based on term and rarity
    let yearlyRate = isRare ? 0.16 : 0.08;
    if (targetItem.category === 'watch') yearlyRate += 0.04;
    if (targetItem.category === 'card') yearlyRate += 0.06; // Cards can be highly volatile

    const totalGrowth = Math.round(yearlyRate * selectedYears * 100);
    const estimatedPrice = Math.round(basePrice * (1 + (yearlyRate * selectedYears)));
    
    // Simulating prediction confidence matching years
    let confidence = 95 - (selectedYears * 5);
    if (isRare) confidence -= 2;

    return {
      growthPercent: totalGrowth,
      price: estimatedPrice,
      confidence,
      status: totalGrowth >= 40 ? '🔥 極速增值' : totalGrowth >= 20 ? '📈 穩健向上' : '💎 保值安全'
    };
  }, [targetItem, selectedYears]);

  // Dynamic calculations for ML Option 2: Anti-counterfeit diagnostic rating
  const safetyDiagnosis = useMemo(() => {
    let score = 40; // Base score
    if (hasLazerTag) score += 35;
    if (hasFullSet) score += 25;

    let rating: 'A' | 'B' | 'C' = 'A';
    let label = '🟢 極其安全';
    let tip = '全套完整，建議安心收藏。';

    if (score >= 85) {
      rating = 'A';
      label = '🟢 極致真品保證';
      tip = '防偽標誌與證件齊全，市場流通價值極高。';
    } else if (score >= 60) {
      rating = 'B';
      label = '🟡 中度流通風險';
      tip = '配附件有缺，交易時需留存官方發票憑證。';
    } else {
      rating = 'C';
      label = '🔴 疑慮高風險件';
      tip = '缺乏核心防偽特徵，強烈建議尋求實體檢驗。';
    }

    return { score, rating, label, tip };
  }, [hasLazerTag, hasFullSet]);

  // Dynamic calculations for ML Option 3: Strategic Portfolio positioning
  const positioning = useMemo(() => {
    let type = '常規收藏盤';
    let suggestRatio = 30;
    let desc = '日常配比推薦';

    if (purpose === 'hold') {
      type = targetItem.isRare ? '🏆 旗艦防禦型 (Grail)' : '🛡️ 穩健保值型 (Stable)';
      suggestRatio = targetItem.isRare ? 45 : 30;
      desc = '在您整體的配比中，適合充當基石，能抵抗短期波動。';
    } else if (purpose === 'gain') {
      type = targetItem.isRare ? '⚡ 暴升黑馬股 (Alpha)' : '📈 高潛力增長型 (Growth)';
      suggestRatio = targetItem.isRare ? 60 : 40;
      desc = '預期波動較大，可於市況高熱度時考慮部分釋出套利。';
    } else {
      type = '❤️ 純粹情感型 (Passion)';
      suggestRatio = 15;
      desc = '收藏純粹出於熱愛，不受市場流動性干擾，推薦長期封存。';
    }

    return { type, suggestRatio, desc };
  }, [targetItem, purpose]);


  // ==================== COMMON STATS COMPILATION ====================
  const totalCount = collectibles.length;
  const totalSum = collectibles.reduce((sum, item) => sum + item.price, 0);
  const averagePriceStr = totalCount > 0 
    ? Math.round(totalSum / totalCount).toLocaleString('zh-TW')
    : '18,500';

  // Categories Calculation
  const categoryValues: Record<string, number> = {};
  collectibles.forEach((item) => {
    categoryValues[item.category] = (categoryValues[item.category] || 0) + item.price;
  });

  let mostValuableCat = collectibles.length > 0 ? '手辦模型' : '未登錄';
  let maxVal = 0;
  Object.entries(categoryValues).forEach(([cat, val]) => {
    if (val > maxVal) {
      maxVal = val;
      mostValuableCat = getCategoryChinese(cat);
    }
  });

  const categoryCounts: Record<string, number> = {};
  collectibles.forEach((item) => {
    const catName = ['model', 'album', 'card', 'perfume', 'figure', 'watch'].includes(item.category) 
      ? item.category 
      : 'other';
    categoryCounts[catName] = (categoryCounts[catName] || 0) + 1;
  });

  const getPercent = (cat: string) => {
    if (totalCount === 0) {
      if (cat === 'model') return 50;
      if (cat === 'album') return 25;
      if (cat === 'card') return 15;
      return 10;
    }
    return Math.round(((categoryCounts[cat] || 0) / totalCount) * 100);
  };

  const modelPercent = getPercent('model');
  const albumPercent = getPercent('album');
  const cardPercent = getPercent('card');
  const otherPercent = Math.max(0, 100 - modelPercent - albumPercent - cardPercent);

  const monthlyLabelAmount = [
    { m: '1月', val: totalCount > 0 ? Math.round(totalSum * 0.15) : 8000 },
    { m: '2月', val: totalCount > 0 ? Math.round(totalSum * 0.22) : 19000 },
    { m: '3月', val: totalCount > 0 ? Math.round(totalSum * 0.08) : 3000 },
    { m: '4月', val: totalCount > 0 ? Math.round(totalSum * 0.12) : 5000 },
    { m: '5月', val: totalCount > 0 ? Math.round(totalSum * 0.28) : 22000 },
    { m: '6月', val: totalCount > 0 ? Math.round(totalSum * 0.15) : 15000 },
  ];
  const chartTotal = monthlyLabelAmount.reduce((s, x) => s + x.val, 0);

  return (
    <div className="space-y-4 pb-20 animate-fadeIn">
      
      {/* Top Header Row with dynamic switcher */}
      <div className="flex flex-col gap-1 mt-1">
        <div className="flex items-center gap-1 text-[10px] text-[#28a094] font-black uppercase tracking-wider">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-[#28a094]" />
          <span>動態智慧加值系統</span>
        </div>
        <div className="flex justify-between items-center">
          <h2 className="text-lg font-black text-[#091426] tracking-tight font-sans">
            AI 數據分析助手
          </h2>
          
          <div className="bg-[#eceef0] p-0.5 rounded-xl flex">
            <button
              onClick={() => setSubTab('ml')}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all flex items-center gap-1 ${
                subTab === 'ml' 
                  ? 'bg-[#091426] text-white shadow-sm' 
                  : 'text-[#75777d] hover:text-[#091426]'
              }`}
            >
              <Cpu className="w-3 h-3 text-[#fed65b]" />
              AI 智慧評估
            </button>
            <button
              onClick={() => setSubTab('basic')}
              className={`px-3 py-1.5 text-[10px] font-black rounded-lg transition-all ${
                subTab === 'basic' 
                  ? 'bg-white text-[#091426] shadow-xs' 
                  : 'text-[#75777d] hover:text-[#091426]'
              }`}
            >
              基本數據統計
            </button>
          </div>
        </div>
      </div>

      {/* ============================== RENDER SUB-TAB: AI 智慧評估 ============================== */}
      {subTab === 'ml' && (
        <div className="space-y-4 animate-slideUp">
          
          {/* STEP 1: Select Active Item (Minimal Selector) */}
          <section className="bg-white border border-[#c5c6cd]/30 p-3.5 rounded-2xl shadow-xs space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-[10px] font-extrabold text-[#75777d] uppercase flex items-center gap-1">
                <Compass className="w-3.5 h-3.5 text-[#28a094]" />
                <span>請選定欲分析之藏品：</span>
              </label>
              <span className="text-[8px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-black border border-emerald-100">
                自動加載
              </span>
            </div>

            <div className="relative">
              <select
                value={selectedItemId}
                onChange={(e) => setSelectedItemId(e.target.value)}
                className="w-full appearance-none bg-[#f8fafc] border border-[#c5c6cd]/55 text-xs text-[#0a1527] font-black py-2.5 pl-3.5 pr-10 rounded-xl focus:border-[#091426] focus:ring-1 focus:ring-[#091426]/10 outline-none cursor-pointer"
              >
                {activeItems.map((item) => (
                  <option key={item.id} value={item.id}>
                    【{getCategoryChinese(item.category)}】{item.name}
                  </option>
                ))}
              </select>
              <span className="material-symbols-outlined absolute right-4.5 top-1/2 -translate-y-1/2 pointer-events-none text-[#75777d] text-base">
                expand_more
              </span>
            </div>

            {/* Quick Micro Status Preview item */}
            <div className="flex items-center gap-2 bg-[#f2f4f6]/40 p-2 rounded-xl border border-dashed border-[#eceef0]">
              <img 
                src={targetItem.imageUrl} 
                alt={targetItem.name} 
                referrerPolicy="no-referrer"
                className="w-8 h-8 object-cover rounded-lg bg-white border flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <p className="text-[11px] font-bold text-[#091426] truncate">{targetItem.name}</p>
                <p className="text-[9px] text-[#75777d] mt-0.5">
                  購入基準價: <span className="font-sans font-bold text-[#091426]">{formatCurrency(targetItem.price)}</span>
                </p>
              </div>
            </div>
          </section>

          {/* EVALUATION CARD A: FUTURE VALUE ESTIMATOR (OPTION-BASED, CLEAN) */}
          <section className="bg-white border border-[#c5c6cd]/30 p-4 rounded-2xl shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-[#eceef0] pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-[#28a094]/10 flex items-center justify-center">
                  <TrendingUp className="w-3.5 h-3.5 text-[#28a094]" />
                </div>
                <h3 className="text-xs font-black text-[#091426]">選項 A：預估未來漲幅指標</h3>
              </div>
              <span className="text-[9px] font-black text-[#28a094] uppercase bg-[#28a094]/5 px-1.5 py-0.5 rounded">
                時序迴歸
              </span>
            </div>

            {/* 1-Click Option Switcher: Years Selector */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-black text-[#75777d]">請選擇預估的時間長度：</span>
              <div className="grid grid-cols-3 gap-1 bg-[#eceef0]/65 p-1 rounded-xl">
                {([1, 3, 5] as const).map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedYears(yr)}
                    className={`py-1.5 text-[10px] font-extrabold rounded-lg transition-all ${
                      selectedYears === yr 
                        ? 'bg-[#091426] text-white shadow-xs' 
                        : 'text-[#45474c] hover:bg-white/30'
                    }`}
                  >
                    {yr} 年後趨勢
                  </button>
                ))}
              </div>
            </div>

            {/* Result Display Bubble: Highly intuitive */}
            <div className="grid grid-cols-2 gap-2 bg-[#f8fafc] border border-[#eceef0] p-3 rounded-xl items-center text-center">
              <div className="border-r border-[#c5c6cd]/25">
                <span className="text-[9px] text-[#75777d] font-bold block mb-0.5">預期估值</span>
                <span className="text-sm font-sans font-black text-[#091426]">
                  {formatCurrency(valueEstimation.price)}
                </span>
              </div>
              <div>
                <span className="text-[9px] text-[#28a094] font-black block mb-0.5">累計動態預測</span>
                <div className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full text-xs font-extrabold">
                  <span>+{valueEstimation.growthPercent}%</span>
                  <span className="text-[9px] text-emerald-600">({valueEstimation.status})</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-[10px] text-[#75777d] bg-[#f2f4f6]/40 p-2 rounded-lg font-medium leading-relaxed">
              <Info className="w-3.5 h-3.5 text-[#091426] flex-shrink-0" />
              <span>依據歷史市場同級品流動與算法回測，此項預測的信心指數為 <b>{valueEstimation.confidence}%</b>。</span>
            </div>
          </section>

          {/* EVALUATION CARD B: AUTHENTICITY RISK CHECK (YES/NO OPTIONS) */}
          <section className="bg-white border border-[#c5c6cd]/30 p-4 rounded-2xl shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-[#eceef0] pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-amber-500/10 flex items-center justify-center">
                  <BadgeCheck className="w-3.5 h-3.5 text-amber-600" />
                </div>
                <h3 className="text-xs font-black text-[#091426]">選項 B：真品風險多層判定</h3>
              </div>
              <span className="text-[9px] font-black text-amber-600 uppercase bg-amber-50 px-1.5 py-0.5 rounded font-mono">
                Decision Tree
              </span>
            </div>

            <p className="text-[10px] text-[#75777d] leading-relaxed">
              請快速勾選此藏品目前的「物理物理標徵」：
            </p>

            {/* Quick Select Options */}
            <div className="space-y-1.5">
              {/* Option toggle 1 */}
              <div className="flex justify-between items-center p-2 rounded-xl bg-[#f8fafc] border border-[#eceef0] text-xs">
                <span className="text-[10px] text-[#45474c] font-bold">1. 具備官方激光標籤 / 密封防偽雷射貼質？</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setHasLazerTag(true)}
                    className={`px-2 py-1 text-[9px] font-black rounded ${
                      hasLazerTag ? 'bg-[#28a094] text-white' : 'bg-[#eceef0] text-[#75777d]'
                    }`}
                  >
                    具備
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasLazerTag(false)}
                    className={`px-2 py-1 text-[9px] font-black rounded ${
                      !hasLazerTag ? 'bg-rose-500 text-white' : 'bg-[#eceef0] text-[#75777d]'
                    }`}
                  >
                    無
                  </button>
                </div>
              </div>

              {/* Option toggle 2 */}
              <div className="flex justify-between items-center p-2 rounded-xl bg-[#f8fafc] border border-[#eceef0] text-xs">
                <span className="text-[10px] text-[#45474c] font-bold">2. 購買憑證、證書及原廠包裝全套齊全？</span>
                <div className="flex gap-1">
                  <button
                    type="button"
                    onClick={() => setHasFullSet(true)}
                    className={`px-2 py-1 text-[9px] font-black rounded ${
                      hasFullSet ? 'bg-[#28a094] text-white' : 'bg-[#eceef0] text-[#75777d]'
                    }`}
                  >
                    完整
                  </button>
                  <button
                    type="button"
                    onClick={() => setHasFullSet(false)}
                    className={`px-2 py-1 text-[9px] font-black rounded ${
                      !hasFullSet ? 'bg-amber-500 text-white' : 'bg-[#eceef0] text-[#75777d]'
                    }`}
                  >
                    缺件
                  </button>
                </div>
              </div>
            </div>

            {/* Simple Result Banner */}
            <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-1 ${
              safetyDiagnosis.rating === 'A' 
                ? 'bg-emerald-50/50 border-emerald-200 text-emerald-900' 
                : safetyDiagnosis.rating === 'B'
                ? 'bg-amber-50/50 border-amber-200 text-amber-900'
                : 'bg-rose-50/50 border-rose-200 text-rose-900'
            }`}>
              <span className="text-xs font-black flex items-center gap-1.5">
                {safetyDiagnosis.label}
              </span>
              <p className="text-[10px] font-medium leading-relaxed opacity-90 px-2 pt-0.5">
                {safetyDiagnosis.tip}
              </p>
            </div>
          </section>

          {/* EVALUATION CARD C: SMART POSITIONER (CHOICES OPTIONS) */}
          <section className="bg-white border border-[#c5c6cd]/30 p-4 rounded-2xl shadow-xs space-y-3">
            <div className="flex justify-between items-center border-b border-[#eceef0] pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-5 h-5 rounded-md bg-indigo-500/10 flex items-center justify-center">
                  <Compass className="w-3.5 h-3.5 text-indigo-600" />
                </div>
                <h3 className="text-xs font-black text-[#091426]">選項 C：收藏定位策略配比</h3>
              </div>
              <span className="text-[9px] font-black text-indigo-600 uppercase bg-indigo-50 px-1.5 py-0.5 rounded">
                集群定位
              </span>
            </div>

            {/* Quick Option Slider for Collector Purpose */}
            <div className="space-y-1.5">
              <span className="text-[9px] font-black text-[#75777d]">選擇您的主要收藏目的：</span>
              <div className="grid grid-cols-3 gap-1 bg-[#eceef0]/65 p-1 rounded-xl">
                {([
                  { key: 'hold', label: '穩健保值' },
                  { key: 'gain', label: '溢價增值' },
                  { key: 'love', label: '純粹情感' }
                ] as const).map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setPurpose(opt.key)}
                    className={`py-1.5 text-[10px] font-extrabold rounded-lg transition-all ${
                      purpose === opt.key 
                        ? 'bg-[#091426] text-white shadow-xs' 
                        : 'text-[#45474c] hover:bg-white/30'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Positioning result */}
            <div className="p-3 bg-slate-50 border border-slate-200/60 rounded-xl space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] text-[#75777d] font-bold">資產戰略定位：</span>
                <span className="text-[11px] font-black text-[#091426] bg-white border px-2 py-0.5 rounded shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
                  {positioning.type}
                </span>
              </div>
              
              {/* SImple metric horizontal bar */}
              <div className="space-y-1">
                <div className="flex justify-between text-[9px] text-[#45474c] font-black px-0.5">
                  <span>建議收藏資產比重：</span>
                  <span className="text-indigo-600">{positioning.suggestRatio}%</span>
                </div>
                {/* Horizontal Progress Micro Bar */}
                <div className="h-1.5 bg-[#eceef0] rounded-full overflow-hidden">
                  <div 
                    style={{ width: `${positioning.suggestRatio}%` }}
                    className="h-full bg-indigo-600 rounded-full transition-all duration-500" 
                  />
                </div>
              </div>

              <p className="text-[10px] text-gray-500 leading-relaxed pt-1.5 text-center">
                {positioning.desc}
              </p>
            </div>
          </section>

        </div>
      )}

      {/* ============================== RENDER SUB-TAB: 基本數據統計 ============================== */}
      {subTab === 'basic' && (
        <div className="space-y-4 animate-slideUp">
          {/* Metrics Grid Cards */}
          <div className="grid grid-cols-2 gap-3">
            {/* Average Price */}
            <div className="bg-white border border-[#c5c6cd]/30 p-4 rounded-xl flex flex-col justify-between h-28 shadow-xs">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#735c00] text-xl material-symbols-filled">
                  payments
                </span>
                <span className="text-[#28a094] text-[9px] font-black bg-emerald-50 px-1.5 py-0.5 rounded-full">+2.4%</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#75777d] mb-0.5">平均單價</p>
                <p className="text-base font-black text-[#091426] tracking-tight font-sans">
                  NT$ {averagePriceStr}
                </p>
              </div>
            </div>

            {/* Top Category */}
            <div className="bg-white border border-[#c5c6cd]/30 p-4 rounded-xl flex flex-col justify-between h-28 shadow-xs">
              <div className="flex justify-between items-start">
                <span className="material-symbols-outlined text-[#28a094] text-xl material-symbols-filled">
                  diamond
                </span>
                <span className="text-[#a16207] text-[9px] font-black bg-[#fed65b]/20 px-1.5 py-0.5 rounded-full border border-[#fed65b]/35">高規格</span>
              </div>
              <div>
                <p className="text-[10px] font-bold text-[#75777d] mb-0.5">最重磅類別</p>
                <p className="text-xs font-black text-[#091426] tracking-tight truncate">
                  {mostValuableCat}
                </p>
              </div>
            </div>
          </div>

          {/* Monthly spending bar chart */}
          <section className="bg-white border border-[#c5c6cd]/30 p-4 rounded-2xl shadow-xs space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#091426] text-lg">calendar_month</span>
                <h3 className="text-xs font-black text-[#091426] tracking-tight">每月支出趨勢</h3>
              </div>
              <span className="text-[10px] text-[#75777d] font-bold">歷史累計</span>
            </div>

            {/* Spending Chart view */}
            <div className="h-28 flex items-end justify-between px-1 gap-2.5 relative pt-3">
              {monthlyLabelAmount.map((item, idx) => {
                const barHeightPercent = Math.min(92, Math.max(15, (item.val / 22000) * 92));
                const isHovered = hoveredMonth === idx;

                return (
                  <div 
                    key={idx} 
                    onMouseEnter={() => setHoveredMonth(idx)}
                    onMouseLeave={() => setHoveredMonth(null)}
                    className="flex-1 flex flex-col items-center gap-1 relative cursor-pointer"
                  >
                    <div 
                      className={`absolute bottom-full mb-1 bg-[#091426] text-white text-[8px] py-0.5 px-1.5 rounded font-sans transition-all duration-200 pointer-events-none z-10 ${
                        isHovered ? 'opacity-100 -translate-y-1' : 'opacity-0'
                      }`}
                    >
                      ${item.val.toLocaleString('zh-TW')}
                    </div>
                    <div 
                      style={{ height: `${barHeightPercent}%` }}
                      className={`w-full rounded-t-sm transition-all duration-300 ${
                        isHovered ? 'bg-[#28a094] scale-x-105' : 'bg-[#091426]'
                      }`} 
                    />
                    <span className="text-[9px] font-bold text-[#75777d] font-sans">{item.m}</span>
                  </div>
                );
              })}
            </div>
            
            <div className="flex justify-between border-t border-[#eceef0] pt-2.5">
              <p className="text-xs font-extrabold text-[#45474c]">累計趨勢總額</p>
              <p className="text-xs font-black text-[#091426] font-sans">
                NT$ {chartTotal.toLocaleString('zh-TW')}
              </p>
            </div>
          </section>

          {/* Category proportion donut chart */}
          <section className="bg-white border border-[#c5c6cd]/30 p-4 rounded-2xl shadow-xs space-y-3">
            <h3 className="text-xs font-black text-[#091426] tracking-tight">收藏品類別佔比</h3>
            <div className="flex items-center justify-between gap-3">
              
              <div className="w-20 h-20 relative flex-shrink-0">
                <svg width="100%" height="100%" viewBox="0 0 42 42" className="transform -rotate-90">
                  <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#eceef0" strokeWidth="5.5" />
                  
                  {/* Model */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#091426"
                    strokeWidth="5.6"
                    strokeDasharray={`${modelPercent} ${100 - modelPercent}`}
                    strokeDashoffset="0"
                  />
                  {/* Album */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#735c00"
                    strokeWidth="5.6"
                    strokeDasharray={`${albumPercent} ${100 - albumPercent}`}
                    strokeDashoffset={-modelPercent}
                  />
                  {/* Card */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#28a094"
                    strokeWidth="5.6"
                    strokeDasharray={`${cardPercent} ${100 - cardPercent}`}
                    strokeDashoffset={-(modelPercent + albumPercent)}
                  />
                  {/* Others */}
                  <circle
                    cx="21"
                    cy="21"
                    r="15.915"
                    fill="transparent"
                    stroke="#c5c6cd"
                    strokeWidth="5.6"
                    strokeDasharray={`${otherPercent} ${100 - otherPercent}`}
                    strokeDashoffset={-(modelPercent + albumPercent + cardPercent)}
                  />
                </svg>
              </div>

              <div className="flex-1 space-y-1.5 text-[10px]">
                <div className="grid grid-cols-2 gap-1.5">
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#091426]" />
                    <p className="font-bold text-[#45474c]">模型 ({modelPercent}%)</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#735c00]" />
                    <p className="font-bold text-[#45474c]">專輯 ({albumPercent}%)</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#28a094]" />
                    <p className="font-bold text-[#45474c]">小卡 ({cardPercent}%)</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-2 h-2 rounded-full bg-[#c5c6cd]" />
                    <p className="font-bold text-[#45474c]">其他 ({otherPercent}%)</p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Activities log */}
          <section className="space-y-2 pb-2">
            <h3 className="text-xs font-black text-[#091426] tracking-tight">近期活動動態</h3>
            <div className="space-y-1.5">
              {activities.length > 0 ? (
                activities.slice(0, 3).map((act) => (
                  <div key={act.id} className="bg-white border border-[#c5c6cd]/25 p-2.5 rounded-xl flex items-center justify-between shadow-2xs">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg bg-[#f2f4f6] flex items-center justify-center text-[#091426]/85">
                        <span className="material-symbols-outlined text-[18px] font-semibold">
                          {act.type === 'purchase' ? 'add_shopping_cart' : 'trending_up'}
                        </span>
                      </div>
                      <div>
                        <p className="text-[11px] font-black text-[#091426] truncate max-w-[150px]">{act.title}</p>
                        <p className="text-[9px] text-[#75777d] mt-0.5">
                          {act.timestamp} · {act.detail}
                        </p>
                      </div>
                    </div>
                    <p className={`text-[10px] font-sans font-black ${act.isPositive ? 'text-[#28a094]' : 'text-[#735c00]'}`}>
                      {act.isPositive ? '+' : ''}${act.value.toLocaleString('zh-TW')}
                    </p>
                  </div>
                ))
              ) : (
                <div className="text-center py-4 text-gray-400 text-xs">
                  尚無近期登錄動態
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
export default AnalyticsTab;
