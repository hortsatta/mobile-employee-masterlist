import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';

import { Text } from './text.component';

type Props ={
  style?: StyleProp<ViewStyle>,
  keyword?: string;
  sortBy?: string;
  orderBy?: string;
  filterByLabel?: string;
  sortByLabel?: string;
}

export const ActiveFiltersHeader: FC<Props> = ({
  style,
  keyword,
  sortBy,
  orderBy,
  filterByLabel,
  sortByLabel
}) => (

  <View style={[styles.activeFiltersWrapper, style]}>
    {(!!keyword?.trim()) && (
      <View style={styles.filterItem}>
        <Text style={[styles.filterText, styles.filterLabel]}>
          {filterByLabel || 'Filter by: '}
        </Text>
        <Text style={styles.filterText}>{keyword}</Text>
      </View>
    )}
    {(sortBy && orderBy) && <View style={styles.filterItem}>
      <Text style={[styles.filterText, styles.filterLabel]}>
        {sortByLabel || 'Sorted by: '}
      </Text>
      <Text style={styles.filterText}>{`${sortBy}, `}</Text>
      <Text style={[styles.filterText, styles.filterOrderText]}>
        {orderBy}
      </Text>
    </View>}
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
