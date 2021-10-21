import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { Divider, IconButton, ToggleButton, useTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { EmployeePageKey, PaperTheme, SortBy } from 'models';
import {
  Button,
  Icon,
  IconName,
  PickerSelect,
  Text,
  TextInput
} from 'features/core/components';

type EmployeeFiltersFormData = {
  pageKey: string;
  sortBy: string;
  searchKeyword?: string;
}

type Props = {
  filters: EmployeeFiltersFormData,
  style?: ViewStyle;
  onSubmit?: (formData: EmployeeFiltersFormData) => void;
}

const schema = z.object({
  pageKey: z.string(),
  sortBy: z.string(),
  searchKeyword: z.string().optional()
});

// Select  picker pagekey items
const pageKeySelectItems = [
  { label: 'Employee Name', value: EmployeePageKey.FULL_NAME },
  { label: 'Hire Date', value: EmployeePageKey.HIRE_DATE }
];

const EmployeeListFilterOptions: FC<Props> = ({ style, filters, onSubmit }) => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<EmployeeFiltersFormData>({
    defaultValues: filters,
    resolver: zodResolver(schema)
  });

  const isAsc = (value: string) => value === SortBy.ASC;

  const handleSortToggleChange = (val: string, onChange: any) => {
    if (!val) { return; }
    onChange(val);
  };

  const handleSubmission = () => {
    handleSubmit(async (formData: EmployeeFiltersFormData) => {
      onSubmit && onSubmit(formData);
    })();
  };

  return (
    <View style={[styles.wrapper(theme), style]}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter & Sort By</Text>
        <Divider />
      </View>
      <Controller
        name='searchKeyword'
        control={control}
        render={
          ({ field: { value, onChange, onBlur } }) => (
            <TextInput
              containerStyle={styles.search}
              label='Find Employee'
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
      <View style={styles.sort}>
        <Controller
          name='pageKey'
          control={control}
          render={
            ({ field: { value, onChange } }) => (
              <PickerSelect
                containerStyle={styles.select}
                placeholder={{ label: 'Select Property', value: null }}
                value={value}
                items={pageKeySelectItems}
                onValueChange={onChange}
              />
            )
          }
        />
        <Controller
          name='sortBy'
          control={control}
          render={
            ({ field: { value, onChange } }) => (
              <ToggleButton.Row
                value={value}
                onValueChange={val => handleSortToggleChange(val, onChange)}
              >
                <ToggleButton
                  style={[
                    styles.toggleSort(theme),
                    styles.sortAsc,
                    isAsc(value) && styles.activeSort(theme)
                  ]}
                  icon={IconName.ARROW_LIST_ASCENDING}
                  value={SortBy.ASC}
                  {...isAsc(value) && { color: '#fff' }}
                />
                <ToggleButton
                  style={[
                    styles.toggleSort(theme),
                    styles.sortDesc,
                    !isAsc(value) && styles.activeSort(theme)
                  ]}
                  icon={IconName.ARROW_LIST_DESCENDING}
                  value={SortBy.DESC}
                  {...!isAsc(value) && { color: '#fff' }}
                />
              </ToggleButton.Row >
            )
          }
        />
      </View>
      <Divider style={styles.divider} />
      <Button style={styles.submitButton} onPress={handleSubmission}>
        <Text style={styles.submitText(theme)}>Apply Filters</Text>
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
    flex: 1,
    borderRightWidth: 0,
    borderTopRightRadius: 0
  },
  sort: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  activeSort: ({ colors }: PaperTheme) => ({
    backgroundColor: colors.primary,
    borderWidth: 0
  }),
  toggleSort: ({ colors }: PaperTheme) => ({
    height: 52,
    backgroundColor: colors.surface,
    borderWidth: 1
  }),
  sortAsc: {
    borderRightWidth: 0,
    borderRadius: 0
  },
  sortDesc: {
    borderLeftWidth: 0,
    borderBottomRightRadius: 0
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

export type { EmployeeFiltersFormData };
export { EmployeeListFilterOptions, pageKeySelectItems };
