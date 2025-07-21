export const formatPrice = (price: number): string => {
  if (price < 0.001) {
    return `$${price.toFixed(8)}`;
  }
  return `$${price.toFixed(6)}`;
};

export const formatMarketCap = (marketCap: number): string => {
  if (marketCap >= 1000000) {
    return `$${(marketCap / 1000000).toFixed(1)}M`;
  } else if (marketCap >= 1000) {
    return `$${(marketCap / 1000).toFixed(1)}K`;
  }
  return `$${marketCap.toFixed(0)}`;
};
