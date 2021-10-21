import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Divider, IconButton, useTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { PaperTheme } from 'models';
import { selectAllDepartments } from 'store/department';
import {
  Button,
  Icon,
  IconName,
  PickerSelect,
  Text,
  TextInput
} from 'features/core/components';

type FormData = {
  filterDepartment?: string;
  searchKeyword?: string;
}

type Props = {
  filters: any;
  style?: StyleProp<ViewStyle>;
  onSubmit?: (formData: FormData) => void;
}

const schema = z.object({
  searchKeyword: z.string().optional(),
  filterDepartment: z.string()
});

export const JobTitleListFilterOptions: FC<Props> = ({ style, filters, onSubmit }) => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      ...filters,
      filterDepartment: filters.filterDepartment?.trim() || ''
    },
    resolver: zodResolver(schema)
  });
  const departments = useSelector(selectAllDepartments);
  const departmentSelectItems = useMemo(() => ([
    { label: 'All', value: '' },
    ...departments.map(d => ({ label: d.name, value: d.id }))
  ]), [departments]);

  const handleSubmission = () => {
    handleSubmit(async (formData: FormData) => {
      onSubmit && onSubmit(formData);
    })();
  };

  return (
    <View style={[styles.wrapper(theme), style]}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filters</Text>
        <Divider />
      </View>
      <Controller
        name='searchKeyword'
        control={control}
        render={
          ({ field: { value, onChange, onBlur } }) => (
            <TextInput
              containerStyle={styles.search}
              label='Find Job Title'
              returnKeyType='done'
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              renderLeftAccessory={() => (
                <View style={styles.searchIcon}>
                  <Icon
                    name={IconName.MAGNIFYING_GLASS}
                    size={18}
                    color={theme.colors.text}
                  />
                </View>
              )}
              {...value && {
                renderRightAccessory: () => (
                  <IconButton
                    style={styles.searchClear}
                    icon={IconName.XMARK}
                    color={theme.colors.text}
                    size={16}
                    onPress={() => onChange('')}
                  />
                )
              }}
            />
          )
        }
      />
      <Controller
        name='filterDepartment'
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
              items={departmentSelectItems}
              error={error}
              onValueChange={onChange}
            />
          )
        }
      />
      <Divider style={styles.divider} />
      <Button style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.submitText(theme)}>Apply Filter</Text>
      </Button>
    </View>
  );
};

const styles = StyleSheet.create<any>({
  wrapper: ({ colors }: PaperTheme) => ({
    paddingTop: 18,
    paddingBottom: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.background
  }),
  divider: {
    marginTop: 30,
    marginBottom: 8
  },
  section: {
    marginTop: 0,
    marginBottom: 20
  },
  sectionTitle: {
    textTransform: 'uppercase',
    letterSpacing: -0.5,
    opacity: 0.5
  },
  search: {
    marginBottom: 8
  },
  searchIcon: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    height: '100%'
  },
  searchClear: {
    marginRight: 0,
    top: 4,
    height: '100%'
  },
  select: {
    flex: 1
  },
  submitButton: {
    alignSelf: 'center',
    width: 170
  },
  submitText: ({ colors, fonts, fontSizes }: PaperTheme) => ({
    color: colors.primary,
    fontFamily: fonts.medium.fontFamily,
    fontSize: fontSizes.button
  })
});
