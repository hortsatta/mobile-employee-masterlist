import { StatusBar } from 'expo-status-bar';
import React, { FC, useMemo, ComponentProps, useRef, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetScrollView as BSScrollView
} from '@gorhom/bottom-sheet';

import { PaperTheme } from 'models';
import { useSelector } from 'react-redux';
import { selectDarkMode } from 'store/core';

type Props = Omit<BottomSheetProps, 'snapPoints'> & {
  show: boolean;
  snapPoints?: Array<string | number> | Animated.SharedValue<Array<string | number>>;
  scrollViewProps?: ComponentProps<typeof BSScrollView>
}

export const BottomSheetScrollView: FC<Props> = ({
  index,
  show,
  snapPoints,
  children,
  scrollViewProps,
  ...moreProps
}) => {

  const theme = useTheme();
  const darkMode = useSelector(selectDarkMode);
  const ref = useRef<BottomSheet>(null);
  const defaultSnapPoints = useMemo(() => ['100%'], []);

  useEffect(() => {
    show ? ref.current?.snapToIndex(index || 0) : ref.current?.close();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  return (
    <>
      <Portal>
        <BottomSheet
          ref={ref}
          handleStyle={styles.handle(theme)}
          backgroundStyle={styles.background(theme)}
          snapPoints={snapPoints || defaultSnapPoints}
          index={-1}
          enablePanDownToClose
          enableOverDrag
          backdropComponent={props => (
            <BottomSheetBackdrop
              opacity={0.3}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              {...props}
            />
          )}
          {...moreProps}
        >
          <BSScrollView nestedScrollEnabled {...scrollViewProps}>
            {children}
          </BSScrollView>
        </BottomSheet>
      </Portal>
      {show && <StatusBar
        backgroundColor={darkMode ? 'rgba(255,255,255,0.4)' : 'rgba(255,255,255,0.5)'}
        style={darkMode ? 'light' : 'dark'}
      />}
    </>
  );

};

const styles = StyleSheet.create<any>({
  handle: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.background,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  }),
  background: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.background
  })
});
