import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Surface } from 'react-native-paper';
import { Placeholder, PlaceholderMedia, PlaceholderLine, Fade } from 'rn-placeholder';

export const EmployeeItemSkeleton: FC = () => (
  <Surface style={styles.wrapper}>
    <Placeholder
      Animation={Fade}
      Left={() => <PlaceholderMedia style={styles.media}/>}
    >
      <View style={styles.content}>
        <PlaceholderLine style={styles.line1} noMargin />
        <PlaceholderLine style={styles.line2} noMargin />
        <PlaceholderLine style={styles.line3} noMargin />
      </View>
    </Placeholder>
  </Surface>
);

const styles = StyleSheet.create({
  wrapper: {
    borderColor: '#e5e5e5',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 65,
    overflow: 'hidden'
  },
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
  }
});
