import { FC, createContext, useState } from "react";

const defaultValue = {
  valueArTransactionId: '',
  setNewArTransactionId: (id: string) => {},
};
export const arTransactionIdContext = createContext(defaultValue);

type Props = {
  children?: React.ReactNode
};

export const ArTransactionIdContextProvider: FC<Props> = ({ children }) => {
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
