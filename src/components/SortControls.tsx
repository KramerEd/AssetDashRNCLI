import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SortOption } from '../types';

interface SortControlsProps {
  sortBy: SortOption;
  onSortChange: (sortOption: SortOption) => void;
}

export const SortControls: React.FC<SortControlsProps> = ({
  sortBy,
  onSortChange,
}) => {
  return (
    <View style={styles.sortContainer}>
      <Text style={styles.sectionTitle}>Sort by</Text>
      <ScrollView horizontal contentContainerStyle={styles.sortButtons}>
        <Pressable
          style={[
            styles.sortButton,
            sortBy === 'market_cap_desc' && styles.activeSortButton,
          ]}
          onPress={() => onSortChange('market_cap_desc')}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'market_cap_desc' && styles.activeSortButtonText,
            ]}
          >
            Market Cap ↓
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            sortBy === 'price_desc' && styles.activeSortButton,
          ]}
          onPress={() => onSortChange('price_desc')}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'price_desc' && styles.activeSortButtonText,
            ]}
          >
            Price ↓
          </Text>
        </Pressable>

        <Pressable
          style={[
            styles.sortButton,
            sortBy === 'created_desc' && styles.activeSortButton,
          ]}
          onPress={() => onSortChange('created_desc')}
        >
          <Text
            style={[
              styles.sortButtonText,
              sortBy === 'created_desc' && styles.activeSortButtonText,
            ]}
          >
            Newest
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  sortContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  activeSortButton: {
    backgroundColor: '#007AFF',
  },
  sortButtonText: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '500',
  },
  activeSortButtonText: {
    color: '#fff',
  },
});
