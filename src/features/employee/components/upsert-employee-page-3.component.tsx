import React, { FC } from 'react';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { TextInput, TextInputArray } from 'features/core/components';
import { EmployeeFormData } from '../scenes';

export const UpsertEmployeePage3: FC = () => {
  const { control } = useFormContext<EmployeeFormData>();
  const phoneFieldArray = useFieldArray({ name: 'phones' });
  const emailFieldArray = useFieldArray({ name: 'emails' });

  return (
    <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
      <View style={styles.wrapper} collapsable={false}>
        <Controller
          name='currentAddress'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label='Current Address'
                returnKeyType='done'
                value={value}
                error={error?.message}
                onChangeText={onChange}
                onBlur={onBlur}
                errorColorOnly
              />
            )
          }
        />
        <Controller
          name='homeAddress'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label='Home Address'
                returnKeyType='done'
                value={value}
                error={error?.message}
                onChangeText={onChange}
                onBlur={onBlur}
                errorColorOnly
              />
            )
          }
        />
        <Divider style={styles.divider} />
        <TextInputArray
          style={styles.inputArray}
          name='phones'
          label='Phone'
          control={control}
          fieldArray={phoneFieldArray}
          keyboardType='phone-pad'
        />
        <Divider style={styles.divider} />
        <TextInputArray
          style={styles.inputArray}
          name='emails'
          label='Email'
          control={control}
          fieldArray={emailFieldArray}
          keyboardType='email-address'
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewWrapper: {
    paddingHorizontal: 16,
    paddingBottom: 60
  },
  wrapper: {
    alignItems: 'center'
  },
  textInput: {
    marginBottom: 8,
    width: '100%'
  },
  divider: {
    marginTop: 8,
    marginBottom: 16,
    width: '100%'
  },
  inputArray: {
    width: '100%'
  }
});
