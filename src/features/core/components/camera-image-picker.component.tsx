import React, { FC, useCallback, useEffect, useState } from 'react';
import {
  launchCameraAsync,
  MediaTypeOptions,
  requestCameraPermissionsAsync
} from 'expo-image-picker';
import { StyleSheet, View } from 'react-native';
import { useTheme } from 'react-native-paper';

import { fontSizes } from 'config/core';
import { PaperTheme } from 'models';
import { Icon, IconName } from './icon.component';
import { Text } from './text.component';

type Props = {
  onSelectImage: (image: any) => void;
  quality?: number;
  onClose?: () => void;
}

export const CameraImagePicker: FC<Props> = ({ quality, onSelectImage, onClose }) => {
  const theme = useTheme();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  const selectImage = useCallback(async () => {
    const result = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: quality || 1
    });

    if (!result.cancelled) {
      const { uri, width, height } = result;
      onSelectImage({ uri, width, height });
    }

    onClose && onClose();
  }, [quality, onSelectImage, onClose]);

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  useEffect(() => {
    hasPermission && selectImage();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasPermission]);

  return (
    <>
      {
        (hasPermission === false) && (
          <View style={styles.disabledWrapper(theme)}>
            <View style={styles.disabled}>
              <Icon name={IconName.CAMERA_SLASH} color={theme.colors.text} size={60} />
              <Text style={styles.consentText}>
                We need your consent to access your phone&apos;s camera.
              </Text>
            </View>
          </View>
        )
      }
    </>
  );
};

const styles = StyleSheet.create<any>({
  disabledWrapper: ({ colors }: PaperTheme) => ({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background
  }),
  disabled: {
    width: 230,
    alignItems: 'center'
  },
  consentText: {
    marginTop: 24,
    textAlign: 'center',
    fontSize: fontSizes.text,
    opacity: 0.6
  }
});
