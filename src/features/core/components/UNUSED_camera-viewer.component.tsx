import { StatusBar } from 'expo-status-bar';
import { FC, useCallback, useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Camera, CameraCapturedPicture, CameraProps } from 'expo-camera';
import { Directions, FlingGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withSpring
} from 'react-native-reanimated';
import { ImageType } from 'expo-camera/build/Camera.types';

import { darkColors, fontSizes } from 'config/core';
import { useAnimatedScale } from '../hooks';
import { Icon, IconName } from './icon.component';
import { Text } from './text.component';

type Props = CameraProps & {
  onSnap: (image?: CameraCapturedPicture) => void;
  onClose: () => void;
}

const RATIO = '16:9';
const IMAGE_SIZE = '2560x1440';

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

const CameraDisabled: FC<{ iconColor: string; }> = ({ iconColor }) => (
  <View style={styles.cameraDisabled}>
    <Icon name={IconName.CAMERA_SLASH} color={iconColor} size={60} />
    <Text style={styles.consentText}>
      We need your consent to access the phone&apos;s camera.
    </Text>
  </View>
);

export const CameraViewer: FC<Props> = ({ style, onSnap, onClose, ...moreProps }) => {
  const { top: insetTop } = useSafeAreaInsets();
  const { animateScale: snapAnimateScale, scaleAnimatedStyle: snapAnimatedStyle } = useAnimatedScale();
  const ref = useRef<Camera>(null);
  const fade = useSharedValue(1);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [ratio, setRatio] = useState(RATIO);
  const [imageSize, setImageSize] = useState(IMAGE_SIZE);
  const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);

  const fadeAnimatedStyle = useAnimatedStyle(() => ({ opacity: fade.value }));

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const fadeAnimate = useCallback(() => {
    'worklet';
    fade.value = withRepeat(withSpring(0), 2, true);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCameraReady = useCallback(() => {
    if (!hasPermission || !ref) { return; }
    // Default ratio validation
    (async () => {
      // Get all supported ratios by the phone's camera.
      const supportedRatios = await ref.current?.getSupportedRatiosAsync();
      // Check if default ratio is supported, else set current
      // ratio to last index of supported ratios.
      if (!supportedRatios || !supportedRatios.length) { return; }
      const exist = supportedRatios.find(r => r === RATIO);
      !exist && setRatio(supportedRatios[supportedRatios.length - 1]);
    })();
    // Default image size validation.
    (async () => {
      // Get all supported image sizes by the phone's camera.
      const supportedSizes = await ref.current?.getAvailablePictureSizesAsync(ratio);
      // Check if default size is supported, else set current
      // image size to first value of supported image sizes.
      if (!supportedSizes || !supportedSizes.length) { return; }
      const exist = supportedSizes.find(size => size === IMAGE_SIZE);
      !exist && setImageSize(supportedSizes[1]);
    })();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  const handleFlipCamera = () => {
    fadeAnimate();
    setCameraType(cameraType === Camera.Constants.Type.front
      ? Camera.Constants.Type.back
      : Camera.Constants.Type.front
    );
  };

  const handleGallery = () => {
    onClose();
  };

  const handleSnap = async () => {
    snapAnimateScale();
    fadeAnimate();
    if (!ref) { return; }

    const image =  await ref.current?.takePictureAsync({
      quality: 0.5,
      isImageMirror: false,
      imageType: ImageType.jpg
    });

    ref.current?.pausePreview();
    onSnap(image);
    onClose();
  };

  return (
    <>
      <View style={[styles.wrapper]}>
        <Pressable style={styles.closeButton(insetTop)} onPress={onClose}>
          <Icon name={IconName.CIRCLE_XMARK} color={darkColors.text} size={36} />
        </Pressable>
        {
          hasPermission
            ? (
              <FlingGestureHandler
                direction={
                  /* eslint-disable no-bitwise */
                  Directions.UP
                    | Directions.DOWN
                    | Directions.LEFT
                    | Directions.RIGHT
                }
                onEnded={handleFlipCamera}
              >
                <Animated.View style={fadeAnimatedStyle}>
                  <Camera
                    focusable
                    ref={ref}
                    style={[styles.camera, style]}
                    type={cameraType}
                    ratio={RATIO}
                    pictureSize={imageSize}
                    onCameraReady={handleCameraReady}
                    // autoFocus
                    {...moreProps}
                  >
                    <View style={styles.controls}>
                      <Pressable style={styles.controlButton} onPress={handleFlipCamera}>
                        <Icon name={IconName.ROTATE} color={darkColors.text} size={30} />
                      </Pressable>
                      <AnimatedPressable
                        style={[styles.snapButton, snapAnimatedStyle]}
                        onPress={handleSnap}
                      >
                        <View style={styles.snapBackdrop} />
                        <View style={styles.snapIcon}>
                          <Icon name={IconName.CAMERA} color={darkColors.text} size={36} />
                        </View>
                      </AnimatedPressable>
                      <Pressable style={styles.controlButton} onPress={handleGallery}>
                        <Icon name={IconName.IMAGE} color={darkColors.text} size={26} />
                      </Pressable>
                    </View>
                  </Camera>
                </Animated.View>
              </FlingGestureHandler>
            )
            : hasPermission === false && (
              <View style={styles.cameraDisabledWrapper}>
                <CameraDisabled iconColor={darkColors.text} />
              </View>
            )
        }
      </View>
      {<StatusBar style='light' backgroundColor='rgba(0,0,0,0.2)' />}
    </>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: {
    flex: 1,
    backgroundColor: '#000'
  },
  closeButton: (insetTop: number) => ({
    padding: 2,
    position: 'absolute',
    marginLeft: 20,
    marginTop: insetTop + 20,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 999,
    zIndex: 1
  }),
  controls: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 22
  },
  controlButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 999
  },
  snapButton: {
    width: 84,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center'
  },
  snapIcon: {
    position: 'absolute',
    zIndex: 1
  },
  snapBackdrop: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0,0,0,0.3)',
    borderRadius: 8,
    transform: [{ rotate: '45deg' }]
  },
  placeholder: {
    width: 40
  },
  camera: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end'
  },
  cameraDisabledWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  cameraDisabled: {
    width: 230,
    alignItems: 'center'
  },
  consentText: {
    marginTop: 20,
    color: darkColors.disabled,
    textAlign: 'center',
    fontSize: fontSizes.text
  }
});
