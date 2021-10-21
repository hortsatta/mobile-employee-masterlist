import { Platform } from 'react-native';

const isPlatformIOS = (): boolean => Platform.OS === 'ios';

export * from './generator.helper';
export * from './guard.helper';
export * from './message.helper';
export { isPlatformIOS };
