import { useCallback, useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { API_URL, PRICE_UPDATE_INTERVAL, STORAGE_KEYS } from '../constants';
import { FilterState, SortOption, TokenData } from '../types';
import { storage } from '../utils/storage';
import { FlashList } from '@shopify/flash-list';

export const useTokenData = (
  ref: React.RefObject<FlashList<TokenData>> | null,
) => {
  const [data, setData] = useState<TokenData[]>([]);
  const [filteredData, setFilteredData] = useState<TokenData[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('market_cap_desc');
  const [filters, setFilters] = useState<FilterState>({
    isNew: false,
    isPro: false,
    minPrice: '',
  });
  const [filtersLoaded, setFiltersLoaded] = useState(false);

  useEffect(() => {
    const loadFilters = async () => {
      try {
        const [savedIsNew, savedIsPro, savedMinPrice] = await Promise.all([
          storage.getBoolean(STORAGE_KEYS.FILTER_IS_NEW),
          storage.getBoolean(STORAGE_KEYS.FILTER_IS_PRO),
          storage.getString(STORAGE_KEYS.FILTER_MIN_PRICE),
        ]);

        setFilters({
          isNew: savedIsNew || false,
          isPro: savedIsPro || false,
          minPrice: savedMinPrice || '',
        });
        setFiltersLoaded(true);
      } catch (error) {
        console.log('Error loading filters:', error);
        setFiltersLoaded(true);
      }
    };

    loadFilters();
  }, []);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(API_URL);
      const jsonData: TokenData[] = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
      Alert.alert('Error', 'Failed to fetch data from API');
    } finally {
      setLoading(false);
    }
  }, []);

  const updateRandomPrices = useCallback(() => {
    setData(prevData =>
      prevData.map(item => {
        if (Math.random() < 0.1) {
          const variation = (Math.random() - 0.5) * 0.2;
          const newPrice = item.price_usd * (1 + variation);
          const newMarketCap = newPrice * item.total_supply;

          return {
            ...item,
            price_usd: Math.max(0, newPrice),
            market_cap_usd: Math.max(0, newMarketCap),
          };
        }
        return item;
      }),
    );
  }, []);

  const applyFiltersAndSort = useCallback(() => {
    let filtered = [...data];

    if (filters.isNew) {
      filtered = filtered.filter(item => item.is_new);
    }

    if (filters.isPro) {
      filtered = filtered.filter(item => item.is_pro);
    }

    if (filters.minPrice && !isNaN(parseFloat(filters.minPrice))) {
      const minPrice = parseFloat(filters.minPrice);
      filtered = filtered.filter(item => item.price_usd >= minPrice);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'market_cap_desc':
          return b.market_cap_usd - a.market_cap_usd;
        case 'market_cap_asc':
          return a.market_cap_usd - b.market_cap_usd;
        case 'price_desc':
          return b.price_usd - a.price_usd;
        case 'price_asc':
          return a.price_usd - b.price_usd;
        case 'created_desc':
          return b.token_created - a.token_created;
        case 'created_asc':
          return a.token_created - b.token_created;
        default:
          return 0;
      }
    });

    setFilteredData(filtered);
  }, [data, filters, sortBy]);

  const handleFilterChange = useCallback(
    async (filterType: keyof FilterState, value: boolean | string) => {
      const newFilters = { ...filters, [filterType]: value };
      setFilters(newFilters);

      if (filtersLoaded) {
        switch (filterType) {
          case 'isNew':
            await storage.set(STORAGE_KEYS.FILTER_IS_NEW, value);
            break;
          case 'isPro':
            await storage.set(STORAGE_KEYS.FILTER_IS_PRO, value);
            break;
          case 'minPrice':
            await storage.set(STORAGE_KEYS.FILTER_MIN_PRICE, value);
            break;
        }
      }
    },
    [filters, filtersLoaded],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (filtersLoaded) {
      applyFiltersAndSort();
    }
  }, [applyFiltersAndSort, filtersLoaded]);

  useEffect(() => {
    const interval = setInterval(updateRandomPrices, PRICE_UPDATE_INTERVAL);
    return () => clearInterval(interval);
  }, [updateRandomPrices]);

  return {
    data,
    filteredData,
    loading: loading || !filtersLoaded,
    sortBy,
    setSortBy,
    filters,
    handleFilterChange,
    fetchData,
  };
};
