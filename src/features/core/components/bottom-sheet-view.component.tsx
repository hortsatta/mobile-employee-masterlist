import { StatusBar } from 'expo-status-bar';
import React, { FC, useMemo, ComponentProps, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { StyleSheet } from 'react-native';
import { Portal, useTheme } from 'react-native-paper';
import Animated from 'react-native-reanimated';
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetProps,
  BottomSheetView as BSView
} from '@gorhom/bottom-sheet';

import { darkColors } from 'config/core';
import { PaperTheme } from 'models';
import { selectDarkMode } from 'store/core';

type Props = Omit<BottomSheetProps, 'snapPoints'> & {
  show: boolean;
  snapPoints?: Array<string | number> | Animated.SharedValue<Array<string | number>>;
  viewProps?: ComponentProps<typeof BSView>
}

export const BottomSheetView: FC<Props> = ({
  index,
  show,
  snapPoints,
  children,
  viewProps,
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
          handleIndicatorStyle={darkMode && styles.handleIndicator}
          handleStyle={styles.handle(theme)}
          backgroundStyle={styles.background(theme)}
          snapPoints={snapPoints || defaultSnapPoints}
          index={-1}
          enablePanDownToClose
          enableOverDrag
          backdropComponent={props => (
            <BottomSheetBackdrop
              opacity={darkMode ? 0.6 : 0.3}
              appearsOnIndex={0}
              disappearsOnIndex={-1}
              {...props}
            />
          )}
          {...moreProps}
        >
          <BSView {...viewProps}>{children}</BSView>
        </BottomSheet>
      </Portal>
      {show && <StatusBar
        backgroundColor={theme.colors.background}
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
  handleIndicator: {
    backgroundColor: darkColors.surface
  },
  background: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.background
  })
});
