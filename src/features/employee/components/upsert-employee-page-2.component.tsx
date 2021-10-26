import { FC } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider, ToggleButton, useTheme } from 'react-native-paper';
import { Controller, useFormContext } from 'react-hook-form';

import { fontSizes } from 'config/core';
import { Gender, PaperTheme } from 'models';
import { DateTimePicker, Icon, IconName, Text, TextInput } from 'features/core/components';
import { EmployeeFormData } from '../scenes';

const ToggleButtonIcon: FC<any> = ({ iconName, label, ...moreProps }) => (
  <View style={styles.toggleButtonIcon}>
    <Icon name={iconName} {...moreProps} size={18} />
    <Text style={styles.toggleButtonIconText(moreProps.color)}>
      {label}
    </Text>
  </View>
);

export const UpsertEmployeePage2: FC = () => {
  const theme = useTheme();
  const { control } = useFormContext<EmployeeFormData>();

  const isFemale = (value: string) => value === Gender.FEMALE;

  const handleGenderToggleChange = (val: string, onChange: any) => {
    if (!val) { return; }
    onChange(val);
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
      <View style={styles.wrapper} collapsable={false}>
        <Controller
          name='firstName'
          control={control}
          render={
            ({
              fieldState: { error },
              field: {value, onChange, onBlur  }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label='First Name'
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
          name='lastName'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label='Last Name'
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
          name='middleInitial'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label='Middle Initial'
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
        <Controller
          name='gender'
          control={control}
          render={
            ({ field: { onChange, value } }) => (
              <ToggleButton.Row
                style={styles.toggleButtonRow}
                value={value}
                onValueChange={val => handleGenderToggleChange(val, onChange)}
              >
                <ToggleButton
                  style={[
                    styles.toggleGender(theme),
                    styles.genderFemale,
                    isFemale(value) && styles.activeGender(theme)
                  ]}
                  icon={props => (
                    <ToggleButtonIcon label='Female' iconName={IconName.FEMALE} {...props} />
                  )}
                  value={Gender.FEMALE}
                  {...isFemale(value) && { color: '#fff' }}
                />
                <ToggleButton
                  style={[
                    styles.toggleGender(theme),
                    styles.genderMale,
                    !isFemale(value) && styles.activeGender(theme)
                  ]}
                  icon={props => (
                    <ToggleButtonIcon label='Male' iconName={IconName.MALE} {...props} />
                  )}
                  value={Gender.MALE}
                  {...!isFemale(value) && { color: '#fff' }}
                />
              </ToggleButton.Row >
            )
          }
        />
        <Controller
          name='birthDate'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <DateTimePicker
                containerStyle={styles.textInput}
                label='Birth Date'
                returnKeyType='done'
                value={value}
                error={error?.message}
                onChange={onChange}
                onBlur={onBlur}
                errorColorOnly
              />
            )
          }
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create<any>({
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
  toggleButtonRow: {
    marginBottom: 8
  },
  toggleButtonIcon: {
    flexDirection:'row',
    alignItems: 'center'
  },
  toggleButtonIconText: (color: string) => ({
    marginLeft: 8,
    color,
    fontSize: fontSizes.text
  }),
  toggleGender: ({ colors }: PaperTheme) => ({
    width: '50%',
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1
  }),
  activeGender: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.primary,
    borderWidth: 0
  }),
  genderFemale: {
    borderRightWidth: 0
  },
  genderMale: {
    borderLeftWidth: 0
  }
});
