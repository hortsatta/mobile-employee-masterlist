import { StyleSheet, useWindowDimensions, View } from 'react-native';
import React, { FC, useCallback, useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Surface, useTheme } from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { fontSizes } from 'config/core';
import { Employee, PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';
import { selectAllJobTitleEntities } from 'store/job-title';
import { Text, TextField } from 'features/core/components';
import { EmployeeImage } from './employee-image.component';

type Props = {
  employee: Employee;
  isScrolling: boolean;
  scrollY?: any;
}

const AnimtedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

export const EmployeeDetail: FC<Props> = ({ employee, scrollY, isScrolling }) => {
  const window = useWindowDimensions();
  const theme = useTheme();
  const darkMode = useSelector(selectDarkMode);
  const jobTitles = useSelector(selectAllJobTitleEntities);
  const zoom = useSharedValue(0);
  const { hireDate, salary, jobTitle, personalInfo } = employee;
  const {
    fullName,
    birthDate,
    gender,
    currentAddress,
    homeAddress,
    pictureThumb,
    phones,
    emails,
    pictureFull
  } = personalInfo;

  const closeImageWhenScrolling = useCallback(() => {
    'worklet';
    if (isScrolling && (zoom.value < 0)) {
      zoom.value = withSpring(0);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isScrolling]);

  useEffect(() => {
    closeImageWhenScrolling();
  }, [closeImageWhenScrolling]);

  const currentJobTitle = useMemo(() => (
    jobTitle && jobTitles[jobTitle.titleId]
  ), [jobTitles, jobTitle]);

  const gradientAnimatedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(
      scrollY.value,
      [0, 150],
      [1, 0],
      Extrapolate.CLAMP
    )
  }));

  const employeeImageAnimatedStyle = useAnimatedStyle(() => ({
    alignSelf: 'center',
    position: 'absolute',
    zIndex: 1,
    top: 80,
    opacity: interpolate(
      scrollY.value,
      [110, 130],
      [1, 0],
      Extrapolate.CLAMP
    ),
    transform: [
      {
        translateY: interpolate(
          scrollY.value,
          [0, 200],
          [40, 55],
          Extrapolate.CLAMP
        )
      }, {
        scale: interpolate(
          scrollY.value,
          [0, 200],
          [1, 0.4],
          Extrapolate.CLAMP
        )
      }
    ]
  }));

  const zoomImageAnimatedStyle = useAnimatedStyle(() => {
    const targetSize = window.width >= 300 ? 300 : window.width;
    const sizeOutput = [100, targetSize];

    return {
      top: 120,
      position: 'absolute',
      alignSelf: 'center',
      zIndex: 1,
      overflow: 'hidden',
      width: interpolate(
        zoom.value,
        [0, 1],
        sizeOutput,
        Extrapolate.CLAMP
      ),
      height: interpolate(
        zoom.value,
        [0, 1],
        sizeOutput,
        Extrapolate.CLAMP
      ),
      borderRadius: interpolate(
        zoom.value,
        [0, 1],
        [100, 12],
        Extrapolate.CLAMP
      ),
      opacity: zoom.value <= 0 ? 0 : 1
    };
  });

  const overlayAnimatedStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.7)',
    zIndex: 1,
    opacity: zoom.value
  }));

  const handleZoomEmployeeImage = () => {
    zoom.value = withSpring(zoom.value <= 0 ? 1 : 0);
  };

  return (
    <View>
      <Animated.View style={employeeImageAnimatedStyle}>
        <EmployeeImage
          wrapperStyle={styles.employeeImgWrapper(darkMode, theme)}
          imageUrl={pictureFull || pictureThumb}
          gender={gender}
          placeholderWidth={80}
          placeholderHeight={80}
          onPress={handleZoomEmployeeImage}
        />
      </Animated.View>
      <View style={styles.header(darkMode, theme)}>
        <AnimtedLinearGradient
          style={[styles.gradient, gradientAnimatedStyle]}
          colors={['transparent', 'rgba(0,0,0,0.5)']}
        />
      </View>
      <Surface style={styles.content(darkMode, theme)}>
        <View style={styles.titleWrapper}>
          <Text style={styles.fullName}>{fullName}</Text>
          <Text style={styles.jobTitle}>{currentJobTitle?.name}</Text>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Work Info</Text>
          <TextField wrapperStyle={styles.textField} label='Date Hired'>
            {hireDate.date}
          </TextField>
          <TextField wrapperStyle={styles.textField} label='Salary'>
            {salary?.salary}
          </TextField>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About Me</Text>
          <TextField wrapperStyle={styles.textField} label='Phones'>
            {phones.join(',  ')}
          </TextField>
          <TextField wrapperStyle={styles.textField} label='Emails'>
            {emails.join('\n')}
          </TextField>
          <TextField wrapperStyle={styles.textField} label='Birth Date'>
            {birthDate.date}
          </TextField>
          <TextField wrapperStyle={styles.textField} label='Current Address'>
            {currentAddress}
          </TextField>
          <TextField wrapperStyle={styles.textField} label='Home Address'>
            {homeAddress}
          </TextField>
        </View>
      </Surface>
      <>
        <Animated.View style={overlayAnimatedStyle}/>
        <EmployeeImage
          wrapperStyle={zoomImageAnimatedStyle}
          imageUrl={pictureFull || pictureThumb}
          gender={gender}
          placeholderWidth={80}
          placeholderHeight={80}
          onPress={handleZoomEmployeeImage}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  header: (isDark: boolean, { colors }: PaperTheme) => ({
    height: 180,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderBottomWidth: 2.5,
    borderColor: isDark ? colors.placeholder : '#464646'
  }),
  gradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '100%'
  },
  employeeImgWrapper: (isDark: boolean, { colors }: PaperTheme) => ({
    width: 100,
    height: 100,
    borderWidth: 2.5,
    borderColor: isDark ? colors.placeholder : '#464646',
    borderRadius: 999,
    overflow: 'hidden'
  }),
  content: (isDark: boolean, { colors }: PaperTheme) => ({
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 16,
    ...isDark && { backgroundColor: colors.background }
  }),
  titleWrapper: {
    paddingBottom: 30,
    alignItems: 'center'
  },
  fullName: {
    height: 25,
    fontSize: 21,
    textTransform: 'uppercase',
    letterSpacing: -1,
    lineHeight: 25
  },
  jobTitle: {
    fontSize: fontSizes.button,
    lineHeight: 20,
    letterSpacing: -0.5
  },
  section: {
    paddingBottom: 8
  },
  sectionTitle: {
    marginBottom: 8,
    textAlign: 'right',
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    opacity: 0.5
  },
  textField: {
    marginBottom: 12
  }
});
