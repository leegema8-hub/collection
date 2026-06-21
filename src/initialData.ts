import { CollectibleItem, WishlistItem } from './types';

export const INITIAL_COLLECTIBLES: CollectibleItem[] = [
  {
    id: 'col-1',
    name: 'Patek Philippe 5711',
    category: 'watch',
    price: 2450000,
    purchaseDate: '2025-10-15',
    source: '頂級鐘錶專櫃',
    notes: '經典金屬藍面盤，收藏界神級逸品。保值力極高。',
    isRare: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6jqZtfskkpCoztJQ9djX8fngQmmgNE5TamX8kpPPvq1EpgEYV5m60fjTwDaAr5JSkim12R4H2fG67AU6YJxbfWrlE_FdbUQYzdG2alLuLIwgWbYe-smBbCQtw0oC6i1hLc7FatM5AIoKsY70OD-tBnETJVjYSFpFfKxKSCMuQM8zBAPjmhOSMphMHN-Sm0pQmQV0t67laaJ5WZpaEBtJbGGlvu3BEsGyrb8AWLjf-fFnS58GvhMSXIzg42ZE5EKRGVqvoptxiVg',
    countLabel: '限量保險庫'
  },
  {
    id: 'col-2',
    name: '解體匠機 牛鋼彈',
    category: 'model',
    price: 102000,
    purchaseDate: '2026-02-12',
    source: '萬代合金精品特裝店',
    notes: '極致塗裝與全骨架可動解體結構，附格納庫地台與限定光束步槍。',
    isRare: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDTGaNgHvngJGCc9eliBuMELF9rsHje4bYgKLePpFrKvrAAdY0VHr1UEndPe9-G2nPm-Xb0KgQ6B04IbKjiPCZYP81jtgMrzoLP3wcVTxIqmnReRdIVPIwjgSDnj2iCKh30n8NiuLqkvshZuvrZ8jihxL5irL8l3g_i3NbN4eh0HvdjwmMczMnakrqJ9dDJdeoQytb2n0RQ1jqqMaCWAwyVQoAcvUxK8aFB6ca1lNo7u18qeP375hrRZmCCo1eGhq31p9A3MGWhQ',
    countLabel: '1/100'
  },
  {
    id: 'col-3',
    name: '元祖超合金魂',
    category: 'figure',
    price: 22000,
    purchaseDate: '2026-03-01',
    source: '秋葉原古物會館',
    notes: '1980年代經典合金復刻版，原裝紙盒與配件齊全，極具情懷。',
    isRare: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDWACUlNBCPPPfu4A17tOtq58LZkhiE3R18unlkBxrumAMQwlDXZLRhrfszuwT20D8hWvRt-70SWJ2qB55U1J6K1Z8M7SJZRqCryESMh41uCDxgsCwdTD2xsGzBgP5ceMEmZzHU7S7YKSzGo0wSyTz0sPpWT99UfII6Dnef5STmushYRAyh6TXiIRjNfF-1sVTZx056FyKFAxlcsNN-3z6eO0qGwqRYiEULNoVpA6hTh-riAckDzwlpPh-ZfLXeaYIOtQWOuKipMg',
  },
  {
    id: 'col-4',
    name: 'Space Molly 400%',
    category: 'figure',
    price: 15600,
    purchaseDate: '2025-11-20',
    source: '泡泡瑪特潮流旗艦店',
    notes: '經典宇航員配色，胸口透明面罩無刮痕，高階潮玩收藏。',
    isRare: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq36O8ssZ_23i3dIsnLGABeio-4kA2UxT4hGwLxvFkbolu8n-yGWt91GmfHv5Ledw6JPXWBaWC5HJ9aD0o5_2Kz3cdkC84AzALz2K-V9TC-0zVHOAbBIpSubxu4bTo3Bl6Qwr9zN4zGe0gwyjzGd3KB79g5fKsTlpd5IWP7smRgaPBJiEbyq7cbhefl-3mm_EOOBeMXW3-ncfsMMKallFf1tWy6A3XRbZp_ZSWDcAqTxhgR2jSxK1xUEL764o0pJltIwI3r0iGqQ',
  },
  {
    id: 'col-5',
    name: 'Pink Floyd - Dark Side',
    category: 'album',
    price: 12800,
    purchaseDate: '2025-08-30',
    source: '倫敦中古黑膠市集',
    notes: '1973年首版壓制，彩虹三稜鏡盒套，內頁微黃但無霉磨損，極其稀有。',
    isRare: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD7J-zFgTFr7icInoiYX79JYr786uYDAw-eKzIT8Q302yvMAUbkMzwEAvU1EwDpnEmmttarZI5u0oadnuzibMX3wWXU776DL392-AIcD8fUTTCGPi1tW9-EjYeerl1jj_D1phA-OZr2neAhaDcKIYKvfCf4KhXgRVucR1kFYWrL_LhimtENsO1z5ViEA4R8WzfBU_zeN_c8TDpv6taIcVcC7qVMqiG_z0FpM7KfqqqaSm1-PVjXP009wwC11PgY6vxj4IeZkfD9w',
    countLabel: '限量'
  },
  {
    id: 'col-6',
    name: '特典親簽小卡',
    category: 'card',
    price: 12500,
    purchaseDate: '2026-01-05',
    source: '簽售會通路親簽契作',
    notes: '限量實體親筆簽名特典，保存於防紫外防震磁吸卡磚中。',
    isRare: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCqlWL0tYlDvpWKHCW6rnwP_xP0lxi9i-qZwiMIFpX21VlOQzqWpa2U8xkoHJidW7AHM0M9gBDzwPmlddFWqAKsUMbDFhZorlZDUNDEeCV65DvumhplFZr0YleZJYOnlJjpCqJS3bEyFr5b5YM7SNeIJlk8GFRSETvS9BTPcqKD6ORkd5DZ98t0F8fzlcGJO3zzDsexCHFDQckEkLmtFi8gD97Q7pvS-45m94qqBsDVc5M1CJbndWltbJJRKfgb_BcbdmQYiOzfdg',
  },
  {
    id: 'col-7',
    name: 'Le Labo Santal 33',
    category: 'perfume',
    price: 9600,
    purchaseDate: '2025-12-18',
    source: '紐約SOHO旗艦店',
    notes: '限定個人客製標籤：Archivist Collection No.33，附原廠牛皮紙包裝。',
    isRare: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAgWEy63XCZrw6yFswPPnO-jWRdFemCb3mDgUcM1zuVfqwy-YJtf4cvgBqBbG3AcIRxUz2rAQUo8cVG_VenmbVQzF9y_FnlIr_iuLloQ61eOa10rj_MNgaswJRutY2CBph0NQCSzoCeb265np4f4ItijNrJU7A3kpOIUwVnHcbql-ui-EY17MiZAAfnNh2pzrmIPKbc_NmH0mLMgs3eyqadNM6m7K_EQ3pC4_C-PN11JJ6dsyCJehZ0qdmuIPdINa6GRoeeE6_H7A',
  },
  {
    id: 'col-8',
    name: '夜影之境 香水',
    category: 'perfume',
    price: 8800,
    purchaseDate: '2026-02-15',
    source: '沙龍香水精品店',
    notes: '極罕見夜景黑色瓶身與重金屬磁吸滾邊蓋殼，前調為沉香木與煙燻皮革。',
    isRare: true,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUUlRnJ4A_ck0PYL5gPSX92FeDL46GQCZKd3ZdOtPtQPdHIKgPkBoaBPi2HlFCb4YCQvmE0Qzcwjs-19CXWiUl4xFaFew-eMsL7nOZVlcUtnY-lfRw7A70MN9EEm_QqRKa-dHvphd5sLU7ePFZMVHLaeVsPwImyJ-OVANCJRdO7wDGp7Z53osyOuKLH5ot1uGCQXVI0Lq0LeXVxj2Ur7sIlMYMNYVzDmZ2KbZVDgOzdSeKon16IHMeEW2W_zDtat5BfX692qiW4w',
    countLabel: '限量'
  },
  {
    id: 'col-9',
    name: '典藏版黑膠組',
    category: 'album',
    price: 6200,
    purchaseDate: '2025-07-22',
    source: '黑膠研究所',
    notes: '特別壓製金色凹凸斑駁紋路，織物編織內襯，附設計師手札。',
    isRare: false,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAAyHl64Kk3T5Fr7abDxEzf6AReOAWmgvI4jbM_jgsZ8AuDh7aJ0QtOepJPJOeC_vpXXlyTmPBFAip6RnU6M_D_b8nhaRV6_FMXunB3vEtBSAuu-6rvMW21vBw_Yy3zMzpPV2Gmhg7wr9rhyiYgbahUNklVrogG0-zl1M1kJkeNNoi9NedFrlGmV0itWGZLGSTKAdvi-kbpVoxoBqe-y8_6rToCCTG4CEa8zpwfTbttCjY_Abqx7SRNtXhNJ0ulq1qyVWr-_Ecrdg',
  }
];

export const INITIAL_WISHLIST: WishlistItem[] = [
  {
    id: 'wish-1',
    name: '鋼鐵俠 Mark LXXXV 豪華版',
    category: 'model',
    estimatedPrice: 8500,
    priority: 'high',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7aq0Ph-vxduPZh9OmKCjqty3tUxISOk3kvRpcwaazFDQePBsBkxNOh7MgeKgKnnjkB_RFTZ5gEvaLSyydlif8nxNTA7QyzXOKNS_72VjGk4qh9ulV6dCBcHBc1Yyhk9wvLUhGbLNFCsslm1zPPpjlYCRq63hjApHklMLUn9h-8kiDuhcOa3o0lT-38KQSbPn7ymaYVLcSWPIB-FiFvdQ96ujo8hOGjCLJc0eqMR5YKxHs2Y3-Iq-a_Hm7EiKbeduOxhhD6u6DqA',
    notes: '全新未拆，1/6 比例極致細節。熱賣必備款。'
  },
  {
    id: 'wish-2',
    name: 'Le Labo Santal 33 (100ml)',
    category: 'perfume',
    estimatedPrice: 3200,
    priority: 'medium',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA-BdgQf0mpvAKUCeokzKWSvbJfHVL9ewWaNS6KDtPN_lkTHCbAlmGG0r2t73CBp-Xegb7KTL98Y37chiOOIA9Glh84b6h9T4nnSCkxL2N0zdgY5EZazfc2SjTm8FGNXl_Q9XyiVxfl2yPhqLRL8YHWdAiKu_kRyeA8Vd7XdXtu1ZEOqqTc252h0e1IG-hgewCwXpeajljp_FKupPZVOhYZX6DNc1x7Gpe_uHueIy-c1IYrHLAucK0XmylqW5bTDBewOzSDkeDUGQ',
    notes: '微醺香木與皮革香，優雅低調的日常沙龍穿搭香。'
  },
  {
    id: 'wish-3',
    name: '限定版透明黑膠專輯',
    category: 'album',
    estimatedPrice: 1100,
    priority: 'low',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCKOZl_9VLEs5D1LvH77t1N5l_egWRYc3KID8hPvYfVS73N60giDxIxF-UCgB_WCoMNaDKZFxbM9DABEpcNwt2C8VrjvC5UneBhpeWGEEnhHI9bBG8rQLWkdMqhNuCdHgknqIoQF4yaol74tI6GceAytseE6PKy4coTW56y_fPb6LXubO7KFw05e4HbMyG_NQhuz5d5s08OEwUvBQZbaxrIqNyOSI9Su4bgDzSOi01Hu9zNoH-TrBxcA_2w00YObo9-FjLw9A_y0Q',
    notes: '180g 重磅透明發燒盤盤面，音響迷熱搜發燒天碟。'
  }
];

export const PRESET_IMAGES = [
  {
    name: '高級機械手錶',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA6jqZtfskkpCoztJQ9djX8fngQmmgNE5TamX8kpPPvq1EpgEYV5m60fjTwDaAr5JSkim12R4H2fG67AU6YJxbfWrlE_FdbUQYzdG2alLuLIwgWbYe-smBbCQtw0oC6i1hLc7FatM5AIoKsY70OD-tBnETJVjYSFpFfKxKSCMuQM8zBAPjmhOSMphMHN-Sm0pQmQV0t67laaJ5WZpaEBtJbGGlvu3BEsGyrb8AWLjf-fFnS58GvhMSXIzg42ZE5EKRGVqvoptxiVg'
  },
  {
    name: '鋼鐵戰士模型',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB7aq0Ph-vxduPZh9OmKCjqty3tUxISOk3kvRpcwaazFDQePBsBkxNOh7MgeKgKnnjkB_RFTZ5gEvaLSyydlif8nxNTA7QyzXOKNS_72VjGk4qh9ulV6dCBcHBc1Yyhk9wvLUhGbLNFCsslm1zPPpjlYCRq63hjApHklMLUn9h-8kiDuhcOa3o0lT-38KQSbPn7ymaYVLcSWPIB-FiFvdQ96ujo8hOGjCLJc0eqMR5YKxHs2Y3-Iq-a_Hm7EiKbeduOxhhD6u6DqA'
  },
  {
    name: '典藏版香水瓶',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDUUlRnJ4A_ck0PYL5gPSX92FeDL46GQCZKd3ZdOtPtQPdHIKgPkBoaBPi2HlFCb4YCQvmE0Qzcwjs-19CXWiUl4xFaFew-eMsL7nOZVlcUtnY-lfRw7A70MN9EEm_QqRKa-dHvphd5sLU7ePFZMVHLaeVsPwImyJ-OVANCJRdO7wDGp7Z53osyOuKLH5ot1uGCQXVI0Lq0LeXVxj2Ur7sIlMYMNYVzDmZ2KbZVDgOzdSeKon16IHMeEW2W_zDtat5BfX692qiW4w'
  },
  {
    name: '精密機甲公仔',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDDTGaNgHvngJGCc9eliBuMELF9rsHje4bYgKLePpFrKvrAAdY0VHr1UEndPe9-G2nPm-Xb0KgQ6B04IbKjiPCZYP81jtgMrzoLP3wcVTxIqmnReRdIVPIwjgSDnj2iCKh30n8NiuLqkvshZuvrZ8jihxL5irL8l3g_i3NbN4eh0HvdjwmMczMnakrqJ9dDJdeoQytb2n0RQ1jqqMaCWAwyVQoAcvUxK8aFB6ca1lNo7u18qeP375hrRZmCCo1eGhq31p9A3MGWhQ'
  },
  {
    name: '珍罕迷幻唱片',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBD7J-zFgTFr7icInoiYX79JYr786uYDAw-eKzIT8Q302yvMAUbkMzwEAvU1EwDpnEmmttarZI5u0oadnuzibMX3wWXU776DL392-AIcD8fUTTCGPi1tW9-EjYeerl1jj_D1phA-OZr2neAhaDcKIYKvfCf4KhXgRVucR1kFYWrL_LhimtENsO1z5ViEA4R8WzfBU_zeN_c8TDpv6taIcVcC7qVMqiG_z0FpM7KfqqqaSm1-PVjXP009wwC11PgY6vxj4IeZkfD9w'
  },
  {
    name: '限定潮流潮玩',
    url: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCq36O8ssZ_23i3dIsnLGABeio-4kA2UxT4hGwLxvFkbolu8n-yGWt91GmfHv5Ledw6JPXWBaWC5HJ9aD0o5_2Kz3cdkC84AzALz2K-V9TC-0zVHOAbBIpSubxu4bTo3Bl6Qwr9zN4zGe0gwyjzGd3KB79g5fKsTlpd5IWP7smRgaPBJiEbyq7cbhefl-3mm_EOOBeMXW3-ncfsMMKallFf1tWy6A3XRbZp_ZSWDcAqTxhgR2jSxK1xUEL764o0pJltIwI3r0iGqQ'
  }
];
