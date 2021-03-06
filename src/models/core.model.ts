import firebase from 'firebase';
import { Theme } from 'react-native-paper/lib/typescript/types';

export enum GridMode { SINGLE, BATCH }

type AuditTrail = {
  createdAt?: firebase.firestore.Timestamp | string;
  updatedAt?: firebase.firestore.Timestamp | string;
  createdByUserId?: string;
  updatedByUserId?: string;
}

type NotificationMessage = {
  status: 'success' | 'error' | 'warning' | 'info';
  message: string;
}

type PaperTheme = Omit<Theme, 'colors'> & {
  colors: {
    primary: string;
    background: string;
    backgroundSecondary: string;
    border: string;
    secondary: string;
    surface: string;
    accent: string;
    index: string;
    error: string;
    text: string;
    onSurface: string;
    disabled: string;
    placeholder: string;
    backdrop: string;
    notification: string;
  };
  fontSizes: {
    sceneTitle: number;
    text: number;
    label: number;
    menuTitle: number;
    button: number;
  };
};

export type { AuditTrail, NotificationMessage, PaperTheme };
