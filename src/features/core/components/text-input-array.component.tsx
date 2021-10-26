import { FC, useEffect } from 'react';
import { Control, Controller, UseFieldArrayReturn } from 'react-hook-form';
import { KeyboardTypeOptions, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';
import { IconButton, useTheme } from 'react-native-paper';

import { IconName } from './icon.component';
import { TextInput } from './text-input.component';

type Props = {
  name: string;
  control: Control<any>;
  fieldArray: UseFieldArrayReturn<any>;
  style?: StyleProp<ViewStyle>;
  label?: string;
  keyboardType?: KeyboardTypeOptions | undefined;
}

export const TextInputArray: FC<Props> = ({
  style,
  name,
  label,
  control,
  fieldArray,
  keyboardType
}) => {

  const theme = useTheme();
  const { fields, append, remove } = fieldArray;

  const appendItem = () => append({ value: '' });

  const removeItem = (index: number) => {
    fields.length > 1 && remove(index);
  };

  useEffect(() => {
    !fields.length && appendItem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={style}>
      {fields.map((field, index) => (
        <Controller
          key={field.id}
          name={`${name}.${index}.value`}
          control={control}
          render={
            ({
              fieldState: { error },
              field: { value, onChange, onBlur }
            }: any) => (
              <TextInput
                containerStyle={styles.textInput}
                label={`${label} ${index + 1}`}
                keyboardType={keyboardType || 'default'}
                returnKeyType='done'
                value={value}
                error={error?.message}
                onChangeText={onChange}
                onBlur={onBlur}
                errorColorOnly
                renderRightAccessory={() => (
                  <IconButton
                    style={styles.remove}
                    icon={IconName.CIRCLE_XMARK}
                    color='red'
                    size={24}
                    onPress={() => removeItem(index)}
                    disabled={fields.length <= 1}
                  />
                )}
              />
            )
          }
        />
      ))}
      <IconButton
        style={styles.add}
        icon={IconName.SQUARE_PLUS}
        color={theme.colors.primary}
        size={30}
        onPress={appendItem}
      />
    </View>
  );

};

const styles = StyleSheet.create({
  textInput: {
    marginBottom: 8,
    width: '100%'
  },
  remove: {
    marginRight: 0,
    left: 4,
    top: 4,
    height: '100%'
  },
  add: {
    alignSelf: 'flex-end'
  }
});
