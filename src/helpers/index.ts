import { Platform } from 'react-native';

const isPlatformIOS = (): boolean => Platform.OS === 'ios';

export * from './message.helper';
export * from './generator.helper';
export { isPlatformIOS };
