import { FC } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

import { PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';

export const JobTitleItemSkeleton: FC = () => {
  const theme = useTheme();
  const darkMode = useSelector(selectDarkMode);

  return (
    <Surface style={styles.wrapper(theme)}>
      <Placeholder Animation={Fade} Left={() => <PlaceholderMedia style={[styles.media, darkMode && styles.dark]} />}>
        <View style={[styles.content, darkMode && styles.dark]}>
          <PlaceholderLine style={styles.line1} noMargin />
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
    height: 55,
    overflow: 'hidden'
  }),
  media: {
    width: 16,
    height: 55,
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
  dark: {
    opacity: 0.1
  }
});
