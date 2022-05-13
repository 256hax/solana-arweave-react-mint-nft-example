import { FC, createContext, useContext, useState } from 'react';
import { Connection } from '@solana/web3.js';
import { ValueClusterType } from '../types/solana';

export const Cluster = {
  devnet: 'https://api.devnet.solana.com',
  testnet: 'https://api.testnet.solana.com',
  mainnet: 'https://api.mainnet-beta.solana.com',
}

const initConnection = (cluster: ValueClusterType) => {
  const connection = new Connection(cluster, 'confirmed');

  return connection;
}

const defaultValue = {
  connection: initConnection(Cluster.devnet),
  changeSolanaCluster: (cluster: string) => {},
};
export const SolanaClusterContext = createContext(defaultValue);

type Props = {
  children?: React.ReactNode
};

export const SolanaClusterContextProvider: FC<Props> = ({children}) => {
  const context = useContext(SolanaClusterContext);
  const [connection, setCluster] = useState(context.connection);

  const changeSolanaCluster = (cluster: string) => {
    switch (cluster) {
      case 'https://api.devnet.solana.com':
        setCluster(initConnection(Cluster.devnet));
        break;
      case 'https://api.testnet.solana.com':
        setCluster(initConnection(Cluster.testnet));
        break;
      case 'https://api.mainnet-beta.solana.com':
        setCluster(initConnection(Cluster.mainnet));
        break;
    }
  };

  return (
    <SolanaClusterContext.Provider value={{ connection, changeSolanaCluster }}>
      {children}
    </SolanaClusterContext.Provider>
  );
};
