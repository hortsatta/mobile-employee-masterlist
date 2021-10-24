import React, { FC, useState } from 'react';
import { Image, Pressable, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, Portal, useTheme } from 'react-native-paper';

import { PaperTheme } from 'models';
import {
  CameraImagePicker,
  GalleryImagePicker,
  IconName,
  Text
} from 'features/core/components';
import { shadowElevations } from 'config/core';

type Props = {
  value: any;
  style?: StyleProp<ViewStyle>;
  onImageChange?: (image?: any) => void;
}

enum PickerMode {
  CAMERA = 'camera',
  GALLERY = 'gallery'
}

export const EmployeePhotoPicker: FC<Props> = ({ style, value, onImageChange }) => {
  const theme = useTheme();
  const [pickerMode, setPickerMode] = useState<PickerMode | null>(null);
  const [showRemoveButton, setShowRemoveButton] = useState(false);

  const handleSelectImage = (image: any) => {
    onImageChange && onImageChange(image);
  };

  const handlePickerClose = () =>  setPickerMode(null);

  const handleRemove = () => {
    setShowRemoveButton(false);
    onImageChange && onImageChange(null);
  };

  return (
    <>
      <View style={style} collapsable={false}>
        <View style={styles.imageWrapper(value)}>
          {
            value
              ? (
                <Pressable
                  style={styles.portrait}
                  onPress={() => setShowRemoveButton(!showRemoveButton)}
                >
                  {showRemoveButton && (
                    <View style={styles.removeWrapper}>
                      <IconButton
                        icon={IconName.CIRCLE_XMARK}
                        size={60} onPress={handleRemove}
                      />
                    </View>
                  )}
                  <Image
                    style={styles.portrait}
                    resizeMode='cover'
                    source={{ uri: value }}
                  />
                </Pressable>
              )
              : (
                <>
                  <View style={styles.imageOptions}>
                    <IconButton
                      icon={IconName.CAMERA}
                      size={36}
                      onPress={() => setPickerMode(PickerMode.CAMERA)}
                    />
                    <View style={styles.verticalDivider} />
                    <IconButton
                      icon={IconName.IMAGE}
                      size={36}
                      onPress={() => setPickerMode(PickerMode.GALLERY)}
                    />
                  </View>
                  <Text style={styles.imageText(theme)}>
                    Take a photo or use an existing image for the employee&apos;s portrait picture.
                  </Text>
                </>
              )
          }
        </View>
      </View>
      {pickerMode && (
        <Portal>
          {pickerMode === PickerMode.CAMERA
            ? <CameraImagePicker onSelectImage={handleSelectImage} onClose={handlePickerClose} />
            : <GalleryImagePicker onSelectImage={handleSelectImage} onClose={handlePickerClose} />
          }
        </Portal>
      )}
    </>
  );
};

const styles = StyleSheet.create<any>({
  verticalDivider: {
    marginTop: 8,
    width: 1,
    height: '100%',
    backgroundColor: '#fff',
    opacity: 0.1
  },
  imageWrapper: (hasImage: boolean) => ({
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 250,
    height: 250,
    backgroundColor: 'rgba(0,0,0,0.25)',
    borderRadius: 16,
    overflow: 'hidden',
    ...hasImage && shadowElevations[2]
  }),
  imageOptions: {
    marginBottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center'
  },
  imageText: ({ colors }: PaperTheme) => ({
    paddingHorizontal: 36,
    color: colors.placeholder,
    textAlign: 'center',
    fontSize: 10
  }),
  iconButton: {
    alignItems: 'center'
  },
  portrait: {
    width: '100%',
    height: '100%'
  },
  removeWrapper: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.3)',
    zIndex: 1
  }
});
