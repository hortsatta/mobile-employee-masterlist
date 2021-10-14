import React, { FC, createContext } from 'react';
import {
  cancelAnimation,
  useAnimatedScrollHandler,
  useSharedValue,
  withTiming
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { HEADER_HEIGHT } from 'config/core';

const HeaderContext = createContext<any>({});

const HeaderContextProvider: FC = ({ children }) => {
  const scrollY = useSharedValue(0);
  const headerY = useSharedValue(0);
  const prevHeaderY = useSharedValue(0);
  const { top: insetTop } = useSafeAreaInsets();
  const safeHeaderHeight = HEADER_HEIGHT - insetTop;

  const scrollWorklet = (contentOffsetY: number) => {
    'worklet';
    const diff = contentOffsetY - scrollY.value;
    headerY.value = Math.min(Math.max(headerY.value + diff, 0), safeHeaderHeight);
    scrollY.value = contentOffsetY;
    prevHeaderY.value = headerY.value;
  };

  const endScrollWorklet = () => {
    'worklet';
    const headerYPercent = +(prevHeaderY.value / safeHeaderHeight).toFixed(1);

    const hideHeader = () => {
      cancelAnimation(headerY);
      headerY.value = withTiming(safeHeaderHeight, { duration: 150 });
    };

    const showHeader = () => {
      cancelAnimation(headerY);
      headerY.value = withTiming(0, { duration: 200 });
    };

    if (headerYPercent >= 0.5 && scrollY.value > safeHeaderHeight) {
      hideHeader();
    } else {
      showHeader();
    }
  };

  const resetHeader = () => {
    if (headerY.value <= 0) { return; }
    headerY.value = withTiming(0, { duration: 200 });
  };

  const handleScroll = useAnimatedScrollHandler({
    onScroll: (event: any) => {
      scrollWorklet(event.contentOffset.y);
    },
    onMomentumEnd: () => {
      endScrollWorklet();
    }
  });

  return (
    <HeaderContext.Provider
      value={{
        scrollY,
        headerY,
        safeHeaderHeight,
        onScroll: handleScroll,
        resetHeader
      }}
    >
      {children}
    </HeaderContext.Provider>
  );
};

export { HeaderContext, HeaderContextProvider };
