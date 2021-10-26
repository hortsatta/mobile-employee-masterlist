import { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { useSelector } from 'react-redux';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

import { PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';

export const EmployeeItemSkeleton: FC = () => {
  const theme = useTheme();
  const darkMode = useSelector(selectDarkMode);

  return (
    <Surface style={styles.wrapper(theme)}>
      <Placeholder Animation={Fade} Left={() => <PlaceholderMedia style={[styles.media, darkMode && styles.dark]} />}>
        <View style={[styles.content, darkMode && styles.dark]}>
          <PlaceholderLine style={styles.line1} noMargin />
          <PlaceholderLine style={styles.line2} noMargin />
          <PlaceholderLine style={styles.line3} noMargin />
        </View>
      </Placeholder>
    </Surface>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    borderColor: colors.border,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 65,
    overflow: 'hidden'
  }),
  media: {
    width: 81,
    height: 65,
    borderRadius: 0
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    justifyContent: 'space-around',
    height: '100%'
  },
  line1: {
    width: '80%',
    height: 14
  },
  line2: {
    width: '50%',
    height: 14
  },
  line3: {
    width: '30%',
    height: 14
  },
  dark: {
    opacity: 0.1
  }
});
