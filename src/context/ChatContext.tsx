import { createContext, useContext } from 'react';
import { User } from '@firebase/auth';

export const ChatContext = createContext<any | null>(null);

export function useChatContext() {
  return useContext(ChatContext);
}
