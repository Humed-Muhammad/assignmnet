import { AlertStatus } from '@chakra-ui/react';

export interface MessageTypes {
  type: AlertStatus | null;
  content: string;
}
