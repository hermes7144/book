import React, { useReducer } from 'react';
import { useAuthContext } from './AuthContext';
import { ChatContext } from './ChatContext';
import { useParams } from 'react-router-dom';

type ChatProviderProps = {
  children: React.ReactNode;
};

export function ChatProvider({ children }: ChatProviderProps) {
  const { user } = useAuthContext();
  const params = useParams(); // test

  const INITIAL_STATE = {
    chatId: null,
    otherUser: {},
  };

  const chatReducer = (state, action): any => {
    switch (action.type) {
      case 'CHANGE_USER': {
        return {
          otherUser: action.payload,
          chatId: params.id + (action.payload.uid > user.uid ? action.payload.uid + user.uid : user.uid + action.payload.uid),
        };
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return <ChatContext.Provider value={{ data: state, dispatch }}>{children}</ChatContext.Provider>;
}
