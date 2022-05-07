import { FC, createContext, useContext, useState } from 'react';

// Fix "cluster" if change MUI MenuItem "value"
export const Cluster = {
  localnet: {
    cluster: 'localnet',
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http',
  },
  testnet: {
    cluster: 'testnet',
    host: 'www.arweave.run',
    port: 443,
    protocol: 'https',
  },
  testnet_redstone: {
    cluster: 'testnet_redstone',
    host: 'testnet.redstone.tools',
    port: 443,
    protocol: 'https',
  },
  mainnet: {
    cluster: 'mainnet',
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  },
}

const defaultValue = {
  valueCluster: Cluster.testnet,
  changeCluster: (cluster: string) => {},
};
export const ArweaveClusterContext = createContext(defaultValue);

type Props = {
  children?: React.ReactNode
};

export const ArweaveClusterContextProvider: FC<Props> = ({children}) => {
  const context = useContext(ArweaveClusterContext);
  const [valueCluster, setCluster] = useState(context.valueCluster);

  const changeCluster = (cluster: string) => {
    switch (cluster) {
      case 'localnet':
        setCluster(Cluster.localnet);
        break;
      case 'testnet':
        setCluster(Cluster.testnet);
        break;
      case 'testnet_redstone':
        setCluster(Cluster.testnet_redstone);
        break;
      case 'mainnet':
        setCluster(Cluster.mainnet);
        break;
    }
  };

  return (
    <ArweaveClusterContext.Provider value={{ valueCluster, changeCluster }}>
      {children}
    </ArweaveClusterContext.Provider>
  );
};
