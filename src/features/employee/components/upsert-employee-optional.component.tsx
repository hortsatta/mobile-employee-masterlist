import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';

import { Text } from 'features/core/components';
import { EmployeePhotoPicker } from './employee-photo-picker.component';
import { Controller, useFormContext } from 'react-hook-form';

export const UpsertEmployeeOptional: FC = () => {
  const { control } = useFormContext();

  return (
    <View style={styles.wrapper} collapsable={false}>
      <Controller
        name='picture'
        control={control}
        render={({ field: { value, onChange } }) => (
          <EmployeePhotoPicker
            value={value}
            onImageChange={image => onChange(image?.uri)}
          />
        )}
      />
      <Text style={styles.skipText}>Employee portrait can be added later.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingTop: 16
  },
  skipText: {
    marginTop: 16,
    fontSize: 10,
    textAlign: 'center',
    opacity: 0.4
  }
});
