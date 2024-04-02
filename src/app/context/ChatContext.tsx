"use client"
import React, { createContext, useReducer, ReactNode, useContext } from "react";
import { useAuth } from "./AuthContext";
import { IdTokenResult, User } from "firebase/auth";

interface ChatState {
  chatId: string;
  user: User;
}

interface Action {
  type: string;
  payload?: any;
}

interface ChatContextType {
  data: ChatState;
  dispatch: React.Dispatch<Action>;
}

export const ChatContext = createContext<ChatContextType>({
  data: {
    chatId: "",
    user: {
      uid: "",
      displayName: "",
      metadata: {},
      emailVerified: false,
      isAnonymous: false,
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
        throw new Error("Function not implemented.");
      },
      getIdTokenResult: function (forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
        throw new Error("Function not implemented.");
      },
      reload: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      toJSON: function (): object {
        throw new Error("Function not implemented.");
      },
      email: null,
      phoneNumber: null,
      photoURL: null,
      providerId: ""
    }
  },
  dispatch: () => {}
}
);

interface Props {
  children: ReactNode;
}

// Create a custom hook to consume the chat messages context
export const useChat = () => useContext(ChatContext);


export const ChatContextProvider: React.FC<Props> = ({ children }) => {
  const { user } = useAuth();
  const INITIAL_STATE: ChatState = {
    chatId: "null",
    user: {
      uid: "",
      displayName: "",
      emailVerified: false,
      isAnonymous: false,
      metadata: {},
      providerData: [],
      refreshToken: "",
      tenantId: null,
      delete: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      getIdToken: function (forceRefresh?: boolean | undefined): Promise<string> {
        throw new Error("Function not implemented.");
      },
      getIdTokenResult: function (forceRefresh?: boolean | undefined): Promise<IdTokenResult> {
        throw new Error("Function not implemented.");
      },
      reload: function (): Promise<void> {
        throw new Error("Function not implemented.");
      },
      toJSON: function (): object {
        throw new Error("Function not implemented.");
      },
      email: null,
      phoneNumber: null,
      photoURL: null,
      providerId: ""
    },
  };

  const chatReducer = (state: ChatState, action: Action): ChatState => {
    switch (action.type) {
      case "CHANGE_USER":
        const newChatId =
          user!.uid > action.payload!.uid
            ? user!.uid + action.payload!.uid
            : action.payload!.uid + user!.uid;
        return {
         /// ...state,
          user: action.payload,
          chatId: newChatId,
        };

      default:
        console.log(state);
        return state;
    }
  };

  const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

  return (
    <ChatContext.Provider value={{ data: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
};
