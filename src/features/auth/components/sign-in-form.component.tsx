import { ComponentProps, FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { ActivityIndicator, Divider, IconButton } from 'react-native-paper';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { darkColors, fontSizes } from 'config/core';
import { AuthCredential } from 'models';
import { Button, Icon, IconName, Text, TextInput } from 'features/core/components';
import { ErrorMessage } from 'helpers';

type FormData = AuthCredential;

const FormTextInput: FC<ComponentProps<typeof TextInput>> = ({ containerStyle, ...moreProps}) => (
  <TextInput
    style={styles.input}
    inputContainerStyle={styles.inputContainer}
    containerStyle={[styles.inputWrapper, containerStyle]}
    baseColor={darkColors.text}
    tintColor={darkColors.accent}
    placeholderTextColor={darkColors.text}
    errorColor='#ef5350'
    {...moreProps}
  />
);

const defaultValues: FormData = {
  email: '',
  password: ''
};

const schema = z.object({
  email: z.string().email(ErrorMessage.EMAIL),
  password: z.string().nonempty(ErrorMessage.PASSWORD_EMPTY)
});

type Props = ComponentProps<typeof View> & {
  onSubmit: (formData: FormData) => void;
  loading?: boolean;
}

export const SignInForm: FC<Props> = ({ style, loading, onSubmit }) => {
  const [showPassword, setShowPassword] = useState(false);
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues,
    resolver: zodResolver(schema)
  });

  const handleSignIn = () => {
    handleSubmit(async (formData: FormData) => {
      onSubmit && onSubmit(formData);
    })();
  };

  return (
    <View style={[styles.wrapper, style]}>
      <Controller
        name='email'
        control={control}
        render={
          ({
            fieldState: { error },
            field: { value, onChange, onBlur }
          }) => (
            <FormTextInput
              containerStyle={styles.emailInputWrapper}
              placeholder='Email'
              value={value}
              error={(error as any)?.message}
              keyboardType='email-address'
              autoCapitalize='none'
              onChangeText={onChange}
              onBlur={onBlur}
              renderLeftAccessory={() => (
                <Icon
                  style={styles.icon}
                  name={IconName.ENVELOPE}
                  size={18}
                  color={darkColors.text}
                />
              )}
            />
          )
        }
      />
      <Controller
        name='password'
        control={control}
        render={
          ({
            fieldState: { error },
            field: { value, onChange, onBlur }
          }) => (
            <FormTextInput
              placeholder='Password'
              value={value}
              error={(error as any)?.message}
              autoCompleteType='password'
              returnKeyType='done'
              onChangeText={onChange}
              onBlur={onBlur}
              secureTextEntry={!showPassword}
              renderLeftAccessory={() => (
                <Icon
                  style={styles.icon}
                  name={IconName.KEY}
                  size={18}
                  color={darkColors.text}
                />
              )}
              renderRightAccessory={() => (
                <IconButton
                  icon={showPassword ? IconName.EYE_SLASH : IconName.EYE}
                  color={darkColors.text}
                  size={18}
                  onPress={() => setShowPassword(!showPassword)}
                />
              )}
            />
          )
        }
      />
      <Divider style={styles.divider} />
      <View style={styles.submitButtonWrapper}>
        {
          loading
            ? <ActivityIndicator size={40} color={darkColors.text} />
            : (
              <Button
                style={styles.submitButton}
                mode='outlined'
                onPress={handleSignIn}
              >
                <Text style={styles.submitText}>Login</Text>
              </Button>
            )
        }
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    width: '100%'
  },
  inputWrapper: {
    width: 270,
    height: 50,
    overflow: 'hidden'
  },
  inputContainer: {
    backgroundColor: 'rgba(255,255,255,0.12)'
  },
  input: {
    top: -8,
    color: darkColors.text,
    fontSize: fontSizes.button
  },
  emailInputWrapper: {
    marginBottom: 24
  },
  submitText: {
    color: darkColors.text,
    fontSize: fontSizes.button
  },
  divider: {
    marginVertical: 18,
    width: 200,
    backgroundColor: 'rgba(255,255,255,0.25)'
  },
  submitButtonWrapper: {
    justifyContent: 'center',
    height: 48
  },
  submitButton: {
    width: 120,
    borderWidth: 1.5,
    borderColor: darkColors.text,
    borderRadius: 999
  },
  icon: {
    top: -12,
    marginLeft: 4,
    marginRight: 12
  }
});
