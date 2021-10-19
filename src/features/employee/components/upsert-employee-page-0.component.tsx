import React, { FC, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { Text } from 'features/core/components';

export const UpsertEmployeePage0: FC = () => {
  const ref = useRef<LottieView>(null);

  useEffect(() => {
    ref.current?.play();
  }, []);

  return (
    <View style={styles.wrapper} collapsable={false}>
      <LottieView
        ref={ref}
        style={styles.add}
        source={require('assets/lottie/rocket.json')}
      />
      <View>
        <Text style={styles.contentText}>
          Please follow and populate the required fields to add a new employee.
          Begin by swiping to the left or tap next below.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center'
  },
  add: {
    width: 200
  },
  contentText: {
    marginBottom: 16,
    width: 300,
    fontSize: 12,
    textAlign: 'center'
  }
});
