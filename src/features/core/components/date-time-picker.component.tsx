import { ComponentProps, FC, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { NativeSyntheticEvent, TextInputFocusEventData } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import dayjs from 'dayjs';

import { isPlatformIOS } from 'helpers';
import { selectDarkMode } from 'store/core';
import { TextInput } from './text-input.component';

type Props = ComponentProps<typeof TextInput> & {
  value: Date;
  onChange: any;
  mode?: any;
}

export const DateTimePicker: FC<Props> = ({
  containerStyle,
  value,
  mode,
  onChange,
  onFocus,
  ...moreProps
}) => {

  const darkMode = useSelector(selectDarkMode);
  const ref = useRef<any>(null);
  const [show, setShow] = useState(false);

  const handleChange = (_: Event, date?: Date) => {
    const targetDate = date || value;
    onChange(targetDate);
    setShow(isPlatformIOS);
  };

  const handleFocus = (event: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus && onFocus(event);
    ref?.current?.blur();
    setShow(true);
  };

  return (
    <>
      <TextInput
        inputRef={ref}
        containerStyle={containerStyle}
        value={dayjs(value).format('MMMM DD, YYYY — dddd')}
        showSoftInputOnFocus={false}
        onFocus={handleFocus}
        {...moreProps}
      />
      {show && (
        <RNDateTimePicker
          themeVariant={darkMode ? 'dark' : 'light'}
          value={value}
          mode={mode || 'date'}
          display='default'
          onChange={handleChange}
          is24Hour
        />
      )}
    </>
  );

};
