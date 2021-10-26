import { FC } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { Divider, IconButton, useTheme } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { PaperTheme } from 'models';
import { Button, Icon, IconName, Text, TextInput } from 'features/core/components';

type FormData = {
  searchKeyword?: string;
}

type Props = {
  style?: StyleProp<ViewStyle>;
  searchKeyword?: string;
  onSubmit?: (formData: FormData) => void;
}

const schema = z.object({
  searchKeyword: z.string().optional()
});

export const DepartmentListFilterOptions: FC<Props> = ({ style, searchKeyword, onSubmit }) => {
  const theme = useTheme();
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: { searchKeyword },
    resolver: zodResolver(schema)
  });

  const handleSubmission = () => {
    handleSubmit(async (formData: FormData) => {
      onSubmit && onSubmit(formData);
    })();
  };

  return (
    <View style={[styles.wrapper(theme), style]}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Filter</Text>
        <Divider />
      </View>
      <Controller
        name='searchKeyword'
        control={control}
        render={
          ({ field: { value, onChange, onBlur } }) => (
            <TextInput
              label='Find Department'
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
