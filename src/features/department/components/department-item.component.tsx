import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { ActivityIndicator, useTheme } from 'react-native-paper';

import { fontSizes } from 'config/core';
import { Department, PaperTheme } from 'models';
import { Text } from 'features/core/components';

type Props = {
  item: Department;
  index: number;
  style?: StyleProp<ViewStyle>;
  loading?: boolean;
}

export const DepartmentItem: FC<Props> = ({ style, item, index, loading }) => {
  const theme = useTheme();
  const { name: departmentName, alias } = item;
  const formattedIndex = (`000${++index}`).slice(-3);

  return (
    <View style={[styles.wrapper(theme), style]}>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator />
        </View>
      )}
      <View style={styles.indexWrapper(theme)}>
        <Text style={styles.index}>{formattedIndex}</Text>
      </View>
      <View style={styles.titleWrapper}>
        <Text style={styles.name}>{departmentName}</Text>
        <Text style={styles.alias}>— {alias}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    height: 55,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    overflow: 'hidden'
  }),
  loading: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.2)',
    zIndex: 1
  },
  indexWrapper: ({ colors }: PaperTheme) => ({
    width: 16,
    height: '100%',
    backgroundColor: colors.index
  }),
  index: {
    position: 'absolute',
    right: -23,
    top: 21,
    width: 64,
    fontSize: 10,
    textAlign: 'center',
    letterSpacing: -1,
    opacity: 0.5,
    transform: [
      { rotate: '90deg' },
      { translateX: -15 }
    ]
  },
  titleWrapper: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 4
  },
  name: {
    fontSize: fontSizes.label,
    lineHeight: 18
  },
  alias: {
    fontSize: fontSizes.text,
    opacity: 0.5,
    lineHeight: 16
  }
});
