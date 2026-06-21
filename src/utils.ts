/**
 * Utility functions for currency and numerical formatting
 */

export function formatCurrency(value: number): string {
  return 'NT$ ' + Number(value).toLocaleString('zh-TW');
}

export function formatCompactCurrency(value: number): string {
  if (value >= 1000000) {
    const millions = (value / 1000000).toFixed(1);
    return `NT$ ${millions}M`;
  }
  return formatCurrency(value);
}

export function formatDate(dateString: string): string {
  if (!dateString) return '';
  const parts = dateString.split('-');
  if (parts.length === 3) {
    return `${parts[0]}年${parts[1]}月${parts[2]}日`;
  }
  return dateString;
}

export function getCategoryChinese(cat: string): string {
  switch (cat) {
    case 'model': return '模型';
    case 'album': return '專輯';
    case 'card': return '小卡';
    case 'perfume': return '香水';
    case 'figure': return '公仔';
    case 'watch': return '腕錶';
    default: return cat;
  }
}
