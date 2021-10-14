import React, { FC } from 'react';
import { Image, ImageStyle, Pressable, StyleSheet } from 'react-native';
import { Gender } from 'models';
import Animated  from 'react-native-reanimated';

import FemalePlaceholderSvg from 'assets/svgs/employee-placeholder.svg';
import MalePlaceholderSvg from 'assets/svgs/employee-placeholder-alt.svg';

type Props = {
  gender: string;
  wrapperStyle?: any;
  imageUrl?: string | null;
  placeholderWidth?: number;
  placeholderHeight?: number;
  style?: ImageStyle;
  foo?: any;
  onPress?: () => void;
}

type PlaceholderProps = {
  isMale: boolean;
  width?: number;
  height?: number;
}

const SVG_WIDTH = 41;
const SVG_HEIGHT = 56;

const Placeholder: FC<PlaceholderProps> = ({ isMale, width, height }) => (
  isMale
    ? <MalePlaceholderSvg width={width || SVG_WIDTH} height={height || SVG_HEIGHT} />
    : <FemalePlaceholderSvg width={width || SVG_WIDTH} height={height || SVG_HEIGHT} />
);

export const EmployeeImage: FC<Props> = ({
  wrapperStyle,
  style,
  imageUrl,
  gender,
  placeholderWidth,
  placeholderHeight,
  onPress
}) => (

  <Animated.View style={[styles.wrapper, !imageUrl && styles.placeholder, wrapperStyle]}>
    <Pressable onPress={imageUrl ? onPress : undefined}>
      {
        imageUrl
          ? <Image style={[styles.image, style]} source={{ uri: imageUrl as any }} />
          : (
            <Placeholder
              isMale={gender.toLowerCase() === Gender.MALE}
              width={placeholderWidth}
              height={placeholderHeight}
            />
          )
      }
    </Pressable>
  </Animated.View>

);

const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#cccccc'
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover'
  },
  placeholder: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  }
});
