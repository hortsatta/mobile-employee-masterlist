import { FC, useContext } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { HeaderContext } from '../context';

export const withHeaderResetter = <T extends Record<string, unknown>>(
  WrappedComponent: FC<any>
): FC<T> => {

  const displayName = WrappedComponent.displayName
    || WrappedComponent.name
    || 'Component';

  const WithHeaderResetter = (props: T) => {
    const { resetHeader } = useContext(HeaderContext);

    useFocusEffect(() => resetHeader());

    return <WrappedComponent {...(props as T)} />;
  };

  WithHeaderResetter.displayName = `withHeaderResetter(${displayName})`;

  return WithHeaderResetter;
};
