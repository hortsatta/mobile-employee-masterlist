import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withSpring
} from 'react-native-reanimated';
import LottieView from 'lottie-react-native';

import { Employee, PaperTheme } from 'models';
import { selectAllJobTitleEntities } from 'store/job-title';
import { Text } from 'features/core/components';
import { EmployeeImage } from 'features/employee/components';

type Props = {
  employee: Employee;
  delay?: number;
}

export const NewestEmployee: FC<Props> = ({ employee, delay }) => {
  const theme = useTheme();
  const jobTitles = useSelector(selectAllJobTitleEntities);
  const scale = useSharedValue(0);
  const { personalInfo, jobTitle } = employee;
  const { fullName, gender, pictureFull } = personalInfo;

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }]
  }));

  useEffect(() => {
    scale.value = withDelay(delay || 0, withSpring(1, {}));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Animated.View style={[styles.wrapper, animatedStyle]}>
      <Text style={styles.text(theme)}>Our Newest Employees</Text>
      <View style={styles.employeeWrapper}>
        <EmployeeImage
          wrapperStyle={styles.imageWrapper(theme)}
          imageUrl={pictureFull}
          gender={gender}
        />

        {/* <View style={styles.imageWrapper(theme)}>
          <Image
            style={styles.image}
            source={{ uri: pictureFull as any }}
          />
        </View> */}
        <LottieView
          style={styles.sparkle}
          autoPlay={true}
          source={require('assets/lottie/sparkle.json')}
        />
      </View>
      <Text style={styles.text(theme)}>{fullName}</Text>
      <Text style={[styles.text(theme), styles.jobTitle(theme)]}>
        {jobTitle && jobTitles[jobTitle.id]}
      </Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    alignItems: 'center'
  },
  employeeWrapper: {
    marginVertical: 4,
    width: 125,
    height: 125
  },
  imageWrapper: ({ colors }: PaperTheme) => ({
    backgroundColor: '#cccccc',
    borderWidth: 2,
    borderColor: colors.accent,
    borderRadius: 8,
    overflow: 'hidden'
  }),
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  text: ({ fonts, fontSizes, colors }: PaperTheme) => ({
    color: colors.accent,
    fontFamily: fonts.medium.fontFamily,
    fontSize: fontSizes.label,
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    zIndex: 1
  }),
  jobTitle: ({ fonts, fontSizes }: PaperTheme) => ({
    fontFamily: fonts.regular.fontFamily,
    fontSize: fontSizes.text,
    textTransform: 'none',
    lineHeight: 15
  }),
  sparkle: {
    position: 'absolute',
    right: -18,
    top: -20,
    width: 85,
    height: 85
  }
});
