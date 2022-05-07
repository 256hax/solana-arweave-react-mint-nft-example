import { ValueClusterType } from '../types/arweave';

export const getTransactionUrl = (valueCluster: ValueClusterType, id: string) => {
  const url = valueCluster.protocol + '://' + valueCluster.host + '/' + id;
  return url;
};
