import { StatusBar } from 'expo-status-bar';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View } from 'react-native';
import { Route } from '@react-navigation/routers';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
  useAnimatedStyle
} from 'react-native-reanimated';

import { selectSelectedEmployee, refreshEmployeeStart } from 'store/employee';
import { EmployeeCoverImage, EmployeeDetail } from '../components';

type Props = {
  route: Route<any>;
}

export const EmployeeDetailScene: FC<Props> = ({ route }) => {
  const { id } = route.params as any;
  const selectedEmployee = useSelector(selectSelectedEmployee);
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    dispatch(refreshEmployeeStart(id));
  }, [dispatch, id]);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumBegin: () => {
      !isScrolling && runOnJS(setIsScrolling)(true);
    },
    onMomentumEnd: () => {
      isScrolling && runOnJS(setIsScrolling)(false);
    }
  });

  const coverImageAnimatedStyle = useAnimatedStyle(() => ({
    width: '100%',
    position: 'absolute',
    top: scrollY.value * -0.15
  }));

  return (
    <>
      <View>
        <Animated.View style={coverImageAnimatedStyle}>
          <EmployeeCoverImage
            departmentId={selectedEmployee?.department?.departmentId || ''}
          />
        </Animated.View>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={handleScroll}
        >
          {selectedEmployee && (
            <EmployeeDetail
              employee={selectedEmployee}
              scrollY={scrollY}
              isScrolling={isScrolling}
            />
          )}
        </Animated.ScrollView>
      </View>
      <StatusBar backgroundColor='transparent' style='dark' />
    </>
  );
};
