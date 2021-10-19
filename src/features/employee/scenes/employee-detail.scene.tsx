import { StatusBar } from 'expo-status-bar';
import React, { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/core';
import { Route } from '@react-navigation/routers';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Surface } from 'react-native-paper';
import Animated, {
  useAnimatedScrollHandler,
  useSharedValue,
  runOnJS,
  useAnimatedStyle
} from 'react-native-reanimated';

import { appRoutes } from 'config/core';
import { selectDarkMode } from 'store/core';
import {
  selectSelectedEmployee,
  refreshEmployeeStart,
  setSelectedEmployee
} from 'store/employee';
import { Icon, IconName } from 'features/core/components';
import { EmployeeCoverImage, EmployeeDetail } from '../components';

type Props = {
  route: Route<any>;
}

type HeaderProps = {
  isDark: boolean;
  onPress: () => void;
}

const HeaderLeft: FC<HeaderProps> = ({ isDark, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.headerWrapper}>
      <Surface style={styles.header(isDark)}>
        <Icon name={IconName.LEFT} size={22} />
      </Surface>
    </View>
  </TouchableOpacity>
);

const HeaderRight: FC<HeaderProps> = ({ isDark, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <View style={styles.headerWrapper}>
      <Surface style={styles.header(isDark)}>
        <Icon name={IconName.PEN_SWIRL} size={22} />
      </Surface>
    </View>
  </TouchableOpacity>
);

export const EmployeeDetailScene: FC<Props> = ({ route }) => {
  const { id } = route.params as any;
  const { navigate, setOptions } = useNavigation<any>();
  const isDark = useSelector(selectDarkMode);
  const selectedEmployee = useSelector(selectSelectedEmployee);
  const dispatch = useDispatch();
  const scrollY = useSharedValue(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isReturn, setIsReturn] = useState(false);

  useEffect(() => {
    setOptions({
      headerLeft: (props: any) => (
        <HeaderLeft
          {...props}
          isDark={isDark}
          onPress={() => {
            props.onPress();
            setIsReturn(true);
          }}
        />
      )
    });

    return () => {
      isReturn && dispatch(setSelectedEmployee());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setOptions({
      headerRight: (props: any) => (
        <HeaderRight
          {...props}
          isDark={isDark}
          onPress={() => navigate(appRoutes.upsertEmployee.path)}
        />
      )
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEmployee]);

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

const styles = StyleSheet.create<any>({
  headerWrapper: {
    padding: 16
  },
  header: (isDark: boolean) => ({
    padding: 4,
    borderWidth: 1,
    borderColor: isDark ? '#fff' : '#000',
    borderRadius: 99,
    overflow: 'hidden'
  })
});
