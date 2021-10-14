import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { Image, Pressable, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';

import { Employee, Gender } from 'models';
import { selectAuthLoading, selectCurrentEmployee } from 'store/auth';
import { useAnimatedScale } from '../hooks';

import EmpPlaceholderSvg from 'assets/svgs/employee-placeholder.svg';
import EmpPlaceholderAltSvg from 'assets/svgs/employee-placeholder-alt.svg';
import EmpPlaceholderGrayscaleSvg from 'assets/svgs/employee-placeholder-grayscale.svg';

type Props = {
  onPress?: () => void;
}

const EmployeePicture: FC<{ employee?: Employee }> = ({ employee }) => {
  if (!employee) {
    return (
      <EmpPlaceholderGrayscaleSvg width={31} height={42} />
    );
  }

  if (employee.personalInfo.pictureThumb) {
    return (
      <Image
        style={styles.image}
        source={{ uri: employee.personalInfo.pictureThumb as any }}
      />
    );
  } else {
    return employee.personalInfo.gender === Gender.MALE
      ? <EmpPlaceholderAltSvg width={31} height={42} />
      : <EmpPlaceholderSvg width={31} height={42} />;
  }
};

export const AvatarButton: FC<Props> = ({ onPress }) => {
  const currentEmployee = useSelector(selectCurrentEmployee);
  const authLoading = useSelector(selectAuthLoading);

  const { scaleAnimatedStyle, animateScale } = useAnimatedScale({
    startScale: 0.8,
    startDuration: 100,
    endDuration: 200
  });

  const handlePress = () => {
    animateScale();
    if (authLoading) { return; }
    onPress && onPress();
  };

  return (
    <Pressable style={styles.pressable} onPress={handlePress}>
      <Animated.View style={[styles.menu, scaleAnimatedStyle]}>
        <EmployeePicture employee={currentEmployee} />
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  pressable: {
    paddingTop: 16,
    paddingHorizontal: 16
  },
  menu: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: 50,
    height: 50,
    backgroundColor: '#cccccc',
    borderWidth: 1,
    borderColor: '#808080',
    borderRadius: 999,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  }
});
