import { createContext } from 'react';
import { IUserSession } from "./user-session.service";

export interface IContextType {
    session: IUserSession | null;
    updateSession: (session: IUserSession) => void;
    deleteSession: () => void;
};

export const SessionContext = createContext<IContextType | null>(null);
