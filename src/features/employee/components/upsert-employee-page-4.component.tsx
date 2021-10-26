import { FC, useEffect, useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { Text } from 'features/core/components';

type Props = {
  isUpdate: boolean;
  isCompleted: boolean;
}

export const UpsertEmployeePage4: FC<Props> = ({ isUpdate, isCompleted }) => {
  const planetRef = useRef<LottieView>(null);
  const doneRef = useRef<LottieView>(null);

  useEffect(() => {
    planetRef.current?.play();
  }, []);

  useEffect(() => {
    isCompleted && doneRef.current?.play();
  }, [isCompleted]);

  return (
    <View style={styles.wrapper} collapsable={false}>
      {
        isCompleted
          ? (
            <LottieView
              ref={doneRef}
              style={styles.lottie}
              source={require('assets/lottie/check-done.json')}
              loop={false}
            />
          )
          : (
            <LottieView
              ref={planetRef}
              style={styles.lottie}
              source={require('assets/lottie/planet.json')}
            />
          )
      }
      <View>
        {
          isCompleted
            ? (
              <Text style={styles.contentText}>
                Employee successfully {`${isUpdate ? 'updated' : 'added'}`}.{'\n'}
                Redirecting...
              </Text>
            )
            : (
              <Text style={styles.contentText}>
                You&apos;re almost done, given you&apos;ve populated the required fields.
                Just tap the save button to complete the procedure.
              </Text>
            )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center'
  },
  lottie: {
    width: 200
  },
  contentText: {
    marginBottom: 16,
    width: 300,
    fontSize: 12,
    textAlign: 'center'
  }
});
