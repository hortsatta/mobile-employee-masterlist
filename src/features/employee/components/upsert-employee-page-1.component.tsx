import React, { FC, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Controller, useFormContext } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';

import { Department, JobTitle } from 'models';
import { selectAllDepartments } from 'store/department';
import { selectAllJobTitles } from 'store/job-title';
import { DateTimePicker, PickerSelect, TextInput } from 'features/core/components';
import { EmployeeFormData } from '../scenes';

export const UpsertEmployeePage1: FC = () => {
  const { control, setValue, trigger, watch } = useFormContext<EmployeeFormData>();
  const departments = useSelector(selectAllDepartments);
  const jobTitles = useSelector(selectAllJobTitles);
  const watchDepartment = watch('department');

  const departmentSelectItems = () => (
    departments.map(({ id, alias }: Department) => ({
      label: alias,
      value: id
    }))
  );

  const jobTitleSelectItems = useCallback(() =>  (
    jobTitles
      .filter(title => title.departmentId === watchDepartment)
      .map(({ id, name }: JobTitle) => ({
        label: name,
        value: id
      }))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [watchDepartment]);

  const handleSalaryBlur = (value: string, onBlur: any) => {
    onBlur();

    if (!value?.trim()) { return; }

    const targetValue = parseFloat(value[0] === '.' ? `0${value}` : value);
    setValue('salary', targetValue);
    trigger('salary');
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewWrapper}>
      <View style={styles.wrapper} collapsable={false}>
        <Controller
          name='department'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value, onChange }
            }) => (
              <PickerSelect
                containerStyle={styles.select}
                placeholder={{ label: 'Select Department', value: null }}
                value={value}
                items={departmentSelectItems()}
                error={error}
                onValueChange={onChange}
              />
            )
          }
        />
        <Controller
          name='jobTitle'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value, onChange, onBlur }
            }) => (
              <PickerSelect
                containerStyle={styles.select}
                placeholder={{ label: 'Select Job Title', value: null }}
                value={value}
                items={jobTitleSelectItems()}
                error={error}
                onValueChange={onChange}
                onClose={onBlur}
              />
            )
          }
        />
        <Divider style={styles.divider} />
        <Controller
          name='hireDate'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <DateTimePicker
                containerStyle={styles.textInput}
                label='Hire Date'
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
        <Controller
          name='salary'
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value , onChange, onBlur }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label='Salary'
                returnKeyType='done'
                value={value?.toString() || ''}
                error={error?.message}
                onChangeText={onChange}
                onBlur={() => handleSalaryBlur(value, onBlur)}
                keyboardType='decimal-pad'
                errorColorOnly
              />
            )
          }
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
  divider: {
    marginTop: 8,
    marginBottom: 16,
    width: '100%'
  },
  textInput: {
    marginBottom: 8,
    width: '100%'
  },
  select: {
    marginBottom: 8,
    width: '100%'
  }
});

