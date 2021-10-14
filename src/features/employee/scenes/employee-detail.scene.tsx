import { StatusBar } from 'expo-status-bar';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyleSheet, View } from 'react-native';
import { Route } from '@react-navigation/routers';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue
} from 'react-native-reanimated';

import { selectSelectedEmployee, updateEmployeeStart } from 'store/employee';
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
    dispatch(updateEmployeeStart(id));
  }, [dispatch, id]);

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      scrollY.value = event.contentOffset.y;
    },
    onMomentumBegin: () => {
      !isScrolling && setIsScrolling(true);
    },
    onMomentumEnd: () => {
      isScrolling && setIsScrolling(false);
    }
  });

  return (
    <>
      <View>
        <EmployeeCoverImage
          style={styles.coverImage}
          departmentId={selectedEmployee?.department?.departmentId || ''}
        />
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

const styles = StyleSheet.create({
  coverImage: {
    position: 'absolute',
    top: 0,
    width: '100%'
  }
});
