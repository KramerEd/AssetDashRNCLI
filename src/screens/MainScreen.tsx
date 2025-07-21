import { FlashList } from '@shopify/flash-list';
import React, { useRef } from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  View,
} from 'react-native';
import { useTokenData } from '../hooks/useTokenData';
import { TokenData } from '../types';
import Header from '../components/Header';
import { FilterControls } from '../components/FilterControls';
import { SortControls } from '../components/SortControls';
import { TokenItem } from '../components';
import { LegendList } from '@legendapp/list';

const renderToken = ({ item }: { item: TokenData }) => (
  <TokenItem item={item} />
);

const MainScreen = () => {
  const ref = useRef<FlashList<TokenData>>(null);
  const {
    data,
    filteredData,
    loading,
    sortBy,
    setSortBy,
    filters,
    handleFilterChange,
    fetchData,
  } = useTokenData(ref as React.RefObject<FlashList<TokenData>>);

  if (loading) {
    return (
      <View style={[styles.container, styles.containerCenter]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <SafeAreaView style={styles.safeArea} />
      <LegendList
        ListHeaderComponent={
          <>
            <Header
              totalCount={data.length}
              filteredCount={filteredData.length}
            />

            <FilterControls
              filters={filters}
              onFilterChange={handleFilterChange}
            />

            <SortControls sortBy={sortBy} onSortChange={setSortBy} />
          </>
        }
        data={filteredData}
        renderItem={renderToken}
        keyExtractor={item => item.token_address}
        estimatedItemSize={100}
        refreshing={loading}
        onRefresh={fetchData}
        keyboardDismissMode="on-drag"
        recycleItems
      />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  safeArea: {
    backgroundColor: '#fff',
  },
  containerCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 50,
    fontSize: 18,
    color: '#666',
  },
});
