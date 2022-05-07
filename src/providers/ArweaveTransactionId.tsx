import { FC, createContext, useState } from "react";

const initialValue = {
  valueArTransactionId: '',
  setNewArTransactionId: (id: string) => {},
};
export const arTransactionIdContext = createContext(initialValue);

export const ArTransactionIdContextProvider: FC = ({ children }) => {
  const [valueArTransactionId, setArTransactionId] = useState('');

  const setNewArTransactionId = (id: string) => {
    setArTransactionId(id);
  };

  // return a context provider wrapping children
  return (
    <arTransactionIdContext.Provider value={{ valueArTransactionId, setNewArTransactionId }}>
      {children}
    </arTransactionIdContext.Provider>
  );
};
