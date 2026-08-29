export function sortWishlist(items = [], sortBy = 'recently_added') {
  const list = [...items];

  switch (sortBy) {
    case 'price_low_to_high':
      return list.sort((a, b) => (a.buyPrice || a.rentPrice || 0) - (b.buyPrice || b.rentPrice || 0));
    case 'price_high_to_low':
      return list.sort((a, b) => (b.buyPrice || b.rentPrice || 0) - (a.buyPrice || a.rentPrice || 0));
    case 'price_drops':
      return list.sort((a, b) => (b.priceDrop ? 1 : 0) - (a.priceDrop ? 1 : 0));
    case 'recently_added':
    default:
      return list.sort((a, b) => new Date(b.addedAt || 0) - new Date(a.addedAt || 0));
  }
}
