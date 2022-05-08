import { FC, createContext, useContext, useState } from 'react';
import Arweave from 'arweave';
import { ValueClusterType } from '../types/arweave';

export const Cluster = {
  localnet: {
    host: '127.0.0.1',
    port: 1984,
    protocol: 'http',
  },
  testnet: {
    host: 'www.arweave.run',
    port: 443,
    protocol: 'https',
  },
  testnet_redstone: {
    host: 'testnet.redstone.tools',
    port: 443,
    protocol: 'https',
  },
  mainnet: {
    host: 'arweave.net',
    port: 443,
    protocol: 'https',
  },
}

const initArweave = (cluster: ValueClusterType) => {
  const arweave = Arweave.init({
    host: cluster.host,
    port: cluster.port,
    protocol: cluster.protocol,
  });

  return arweave;
}

const defaultValue = {
  arweave: initArweave(Cluster.testnet),
  changeArweaveCluster: (cluster: string) => {},
};
export const ArweaveClusterContext = createContext(defaultValue);

type Props = {
  children?: React.ReactNode
};

export const ArweaveClusterContextProvider: FC<Props> = ({children}) => {
  const context = useContext(ArweaveClusterContext);
  const [arweave, setCluster] = useState(context.arweave);

  const changeArweaveCluster = (host: string) => {
    switch (host) {
      case '127.0.0.1':
        setCluster(initArweave(Cluster.localnet));
        break;
      case 'www.arweave.run':
        setCluster(initArweave(Cluster.testnet));
        break;
      case 'testnet.redstone.tools':
        setCluster(initArweave(Cluster.testnet_redstone));
        break;
      case 'arweave.net':
        setCluster(initArweave(Cluster.mainnet));
        break;
    }
  };

  return (
    <ArweaveClusterContext.Provider value={{ arweave, changeArweaveCluster }}>
      {children}
    </ArweaveClusterContext.Provider>
  );
};
