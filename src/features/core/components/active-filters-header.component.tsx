import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

import { Text } from './text.component';

type Props ={
  style?: ViewStyle,
  keyword?: string;
  sortBy?: string;
  orderBy?: string;
  filterByLabel?: string;
  sortLabel?: string;
}

export const ActiveFiltersHeader: FC<Props> = ({
  style,
  keyword,
  sortBy,
  orderBy,
  filterByLabel,
  sortLabel
}) => (

  <View style={[styles.activeFiltersWrapper, style]}>
    {(keyword?.trim() !== '') && (
      <View style={styles.filterItem}>
        <Text style={[styles.filterText, styles.filterLabel]}>
          {filterByLabel || 'Filter by: '}
        </Text>
        <Text style={styles.filterText}>{keyword}</Text>
      </View>
    )}
    <View style={styles.filterItem}>
      <Text style={[styles.filterText, styles.filterLabel]}>
        {sortLabel || 'Sorted by: '}
      </Text>
      <Text style={styles.filterText}>{`${sortBy}, `}</Text>
      <Text style={[styles.filterText, styles.filterOrderText]}>
        {orderBy}
      </Text>
    </View>
  </View>

);

const styles = StyleSheet.create({
  activeFiltersWrapper: {
    alignItems: 'center'
  },
  filterItem: {
    flexDirection: 'row',
    height: 16
  },
  filterText: {
    fontSize: 11
  },
  filterLabel: {
    opacity: 0.5
  },
  filterOrderText: {
    textTransform: 'capitalize'
  }
});
