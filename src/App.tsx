import { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import OverviewTab from './components/OverviewTab';
import CollectionTab from './components/CollectionTab';
import WishlistTab from './components/WishlistTab';
import AnalyticsTab from './components/AnalyticsTab';
import AddItemModal from './components/AddItemModal';
import DetailModal from './components/DetailModal';
import { CollectibleItem, WishlistItem, ActiveTab } from './types';
import { INITIAL_COLLECTIBLES, INITIAL_WISHLIST } from './initialData';

export default function App() {
  // Define main state variables
  const [collectibles, setCollectibles] = useState<CollectibleItem[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [activeTab, setActiveTab] = useState<ActiveTab>('overview');
  
  // Modals & details state
  const [selectedItem, setSelectedItem] = useState<CollectibleItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [prepopulatedUrl, setPrepopulatedUrl] = useState('');
  
  // Custom interactive activities ledger (synchronized in localStorage)
  const [activities, setActivities] = useState<Array<{
    id: string;
    type: 'purchase' | 'market_update';
    title: string;
    timestamp: string;
    detail: string;
    value: number;
    isPositive: boolean;
  }>>([]);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Initialize data from LocalStorage or Fallback Seed catalog on load
  useEffect(() => {
    const cachedCollectibles = localStorage.getItem('collector_collectibles');
    const cachedWishlist = localStorage.getItem('collector_wishlist');
    const cachedActivities = localStorage.getItem('collector_activities');

    if (cachedCollectibles) {
      setCollectibles(JSON.parse(cachedCollectibles));
    } else {
      setCollectibles(INITIAL_COLLECTIBLES);
      localStorage.setItem('collector_collectibles', JSON.stringify(INITIAL_COLLECTIBLES));
    }

    if (cachedWishlist) {
      setWishlist(JSON.parse(cachedWishlist));
    } else {
      setWishlist(INITIAL_WISHLIST);
      localStorage.setItem('collector_wishlist', JSON.stringify(INITIAL_WISHLIST));
    }

    if (cachedActivities) {
      setActivities(JSON.parse(cachedActivities));
    } else {
      const initialActivities = [
        {
          id: 'act-1',
          type: 'purchase' as const,
          title: '購入: 1/7 比例模型',
          timestamp: '2天前',
          detail: '模型類別',
          value: 6200,
          isPositive: false,
        },
        {
          id: 'act-2',
          type: 'market_update' as const,
          title: '市場價值更新',
          timestamp: '5天前',
          detail: '限量專輯',
          value: 850,
          isPositive: true,
        },
      ];
      setActivities(initialActivities);
      localStorage.setItem('collector_activities', JSON.stringify(initialActivities));
    }
  }, []);

  // Sync to LocalStorage on updates
  const saveCollectibles = (items: CollectibleItem[]) => {
    setCollectibles(items);
    localStorage.setItem('collector_collectibles', JSON.stringify(items));
  };

  const saveWishlist = (items: WishlistItem[]) => {
    setWishlist(items);
    localStorage.setItem('collector_wishlist', JSON.stringify(items));
  };

  const saveActivities = (items: typeof activities) => {
    setActivities(items);
    localStorage.setItem('collector_activities', JSON.stringify(items));
  };

  // Helper helper to show dynamic toast alerts
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3200);
  };

  // Core actions handlers
  const handleAddNewItem = (itemData: {
    name: string;
    category: string;
    price: number;
    purchaseDate: string;
    source: string;
    notes: string;
    isRare: boolean;
    imageUrl: string;
  }) => {
    const newItem: CollectibleItem = {
      id: 'col-' + Date.now(),
      name: itemData.name,
      category: itemData.category,
      price: itemData.price,
      purchaseDate: itemData.purchaseDate,
      source: itemData.source,
      notes: itemData.notes,
      isRare: itemData.isRare,
      imageUrl: itemData.imageUrl,
      countLabel: itemData.isRare ? '珍稀品' : undefined
    };

    const updatedCollectibles = [newItem, ...collectibles];
    saveCollectibles(updatedCollectibles);

    // Register transaction log in the activities summary
    const newActivity = {
      id: 'act-' + Date.now(),
      type: 'purchase' as const,
      title: `購入: ${newItem.name}`,
      timestamp: '剛剛',
      detail: getCategoryChineseLabel(newItem.category) + '類別',
      value: newItem.price,
      isPositive: false,
    };
    saveActivities([newActivity, ...activities]);

    setShowAddModal(false);
    setPrepopulatedUrl('');
    showToast(`🎉 藏品「${newItem.name}」已成功加入您的保險庫！`);
  };

  const handleDeleteItem = (id: string) => {
    const targetItem = collectibles.find(c => c.id === id);
    if (!targetItem) return;

    const updated = collectibles.filter(c => c.id !== id);
    saveCollectibles(updated);
    showToast(`🗑️ 藏品「${targetItem.name}」紀錄已被永久移出保管保險箱。`);
  };

  // Handle transfer from wishlist to active collection
  const handleMoveToCollection = (item: WishlistItem) => {
    // 1. Delete from wish list
    const updatedWishlist = wishlist.filter(w => w.id !== item.id);
    saveWishlist(updatedWishlist);

    // 2. Insert into collectibles
    const newCollectible: CollectibleItem = {
      id: 'col-' + Date.now(),
      name: item.name,
      category: item.category,
      price: item.estimatedPrice,
      purchaseDate: new Date().toISOString().split('T')[0],
      source: '自願望清單轉入',
      notes: item.notes || '自個人心願期望單中收購轉換而來。',
      isRare: item.priority === 'high',
      imageUrl: item.imageUrl,
      countLabel: item.priority === 'high' ? '特優心願' : undefined
    };
    saveCollectibles([newCollectible, ...collectibles]);

    // 3. Register transaction activity
    const newActivity = {
      id: 'act-' + Date.now(),
      type: 'purchase' as const,
      title: `圓夢購入: ${item.name}`,
      timestamp: '剛剛',
      detail: '心願單圓夢轉入',
      value: item.estimatedPrice,
      isPositive: false,
    };
    saveActivities([newActivity, ...activities]);

    showToast(`🏆 恭喜您實現心願！「${item.name}」已成功收錄進保險庫！`);
  };

  const handleDeleteWishItem = (id: string) => {
    const target = wishlist.find(w => w.id === id);
    if (!target) return;

    const updated = wishlist.filter(w => w.id !== id);
    saveWishlist(updated);
    showToast(`願望「${target.name}」已被移出心願清單。`);
  };

  // Self-healing restore system function
  const handleRestoreDefaults = () => {
    saveCollectibles(INITIAL_COLLECTIBLES);
    saveWishlist(INITIAL_WISHLIST);
    showToast('🔄 已成功還原初始精選收藏、心願單與數據分析動態！');
  };

  const getCategoryChineseLabel = (cat: string) => {
    switch (cat) {
      case 'model': return '模型';
      case 'album': return '專輯';
      case 'card': return '小卡';
      case 'perfume': return '香水';
      case 'figure': return '公仔';
      case 'watch': return '腕錶';
      default: return cat;
    }
  };

  // Select tab header text title
  const getTabTitle = () => {
    switch (activeTab) {
      case 'overview': return '收藏家助手';
      case 'collection': return '收藏清單';
      case 'wishlist': return '收藏心願單';
      case 'analytics': return '數據分析';
      default: return '收藏家助手';
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f9fb] flex justify-center selection:bg-[#091426] selection:text-white antialiased pr-0 pl-0">
      {/* Maximum device width simulator wrapper to match mobile bento grid aesthetic in iframe */}
      <div className="w-full max-w-md bg-[#f7f9fb] min-h-screen relative flex flex-col pt-16 pb-20 shadow-xs">
        
        {/* Navigation Top bar header */}
        <Header 
          title={getTabTitle()} 
          onMenuClick={() => showToast('歡迎使用收藏家旗艦助手！')}
          onSearchClick={() => {
            setActiveTab('collection');
            showToast('已轉至收藏分頁，您可以輸入關鍵字立刻搜尋藏品！');
          }}
        />

        {/* Core Tab switching screens space */}
        <main className="px-4 py-3 flex-1">
          {activeTab === 'overview' && (
            <OverviewTab 
              collectibles={collectibles}
              onOpenAddModal={(url) => {
                if (url) setPrepopulatedUrl(url);
                setShowAddModal(true);
              }}
              onViewItem={(item) => setSelectedItem(item)}
              onShowToast={showToast}
            />
          )}

          {activeTab === 'collection' && (
            <CollectionTab 
              collectibles={collectibles}
              onOpenAddModal={() => {
                setPrepopulatedUrl('');
                setShowAddModal(true);
              }}
              onViewItem={(item) => setSelectedItem(item)}
            />
          )}

          {activeTab === 'wishlist' && (
            <WishlistTab 
              wishlist={wishlist}
              onMoveToCollection={handleMoveToCollection}
              onDeleteWish={handleDeleteWishItem}
              onRestoreDefaults={handleRestoreDefaults}
            />
          )}

          {activeTab === 'analytics' && (
            <AnalyticsTab 
              collectibles={collectibles}
              activities={activities}
            />
          )}
        </main>

        {/* Global sticky Bottom navigation tabs utilities bar */}
        <BottomNav activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Contextual modal drawers & details sheet inspect selectors */}
        {showAddModal && (
          <AddItemModal 
            onClose={() => {
              setShowAddModal(false);
              setPrepopulatedUrl('');
            }}
            onSubmit={handleAddNewItem}
            prepopulatedUrl={prepopulatedUrl}
          />
        )}

        {selectedItem && (
          <DetailModal 
            item={selectedItem}
            onClose={() => setSelectedItem(null)}
            onDelete={handleDeleteItem}
          />
        )}

        {/* Premium floating toast notifications portal */}
        {toastMessage && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-xs bg-[#091426] text-white py-3.5 px-4 rounded-xl shadow-lg z-50 flex items-center gap-2.5 border border-white/10 transition-all duration-300 animate-slideUp text-xs font-medium font-sans">
            <span className="material-symbols-outlined text-[#fed65b] text-base font-semibold">
              stars
            </span>
            <span>{toastMessage}</span>
          </div>
        )}
      </div>
    </div>
  );
}
