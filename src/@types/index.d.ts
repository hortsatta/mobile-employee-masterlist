declare module '*.svg' {
  import React from 'react';
  import { SvgProps } from 'react-native-svg';
  const content: React.FC<SvgProps>;
  export default content;
}

declare module '@env' {
  export const REACT_APP_FIREBASE_API_KEY: string;
  export const REACT_APP_FIREBASE_API_AUTH_DOMAIN: string;
  export const REACT_APP_FIREBASE_API_DATABASE_URL: string;
  export const REACT_APP_FIREBASE_API_PROJECT_ID: string;
  export const REACT_APP_FIREBASE_API_STORAGE_BUCKET: string;
  export const REACT_APP_FIREBASE_API_MESSAGING_SENDER_ID: string;
  export const REACT_APP_FIREBASE_API_APP_ID: string;
  export const REACT_APP_FIREBASE_API_MEASUREMENT_ID: string;
}
