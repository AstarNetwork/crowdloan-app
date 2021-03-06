import { RegistryTypes } from '@polkadot/types/types';
import * as typeDefs from './registry-types';

interface ChainProvider {
  networkAlias: string;
  displayName: string;
  info?: string;
  endpoint: string;
  fallback?: string;
  favicon: string;
  isSupportContract: boolean;
  prefix?: number; // Used in extrinsic transactions, also to determine if a network supports extensic transactions.
  typeDef: RegistryTypes;
  key: endpointKey;
}

export enum endpointKey {
  PLASM = 0,
  SHIDEN = 1,
  DUSTY = 2,
  SHIBUYA = 3,
  LOCAL = 4,
  CUSTOM = 5
}

export const providerEndpoints: ChainProvider[] = [
  {
    networkAlias: 'plasm-main',
    displayName: 'Plasm Network (Mainnet)',
    info: 'The main network of the layer 2 scaling blockchain, Plasm Network',
    endpoint: 'wss://rpc.plasmnet.io/',
    favicon: 'icons/astar.png',
    isSupportContract: false,
    typeDef: typeDefs.plasmDefinitions,
    key: endpointKey.PLASM
  },
  {
    networkAlias: 'shiden-shell',
    displayName: 'Shiden Network (Kusama)',
    info: 'Smart contract platform for decentralized applications (dapps) on the Kusama network',
    endpoint: 'wss://rpc.shiden.astar.network',
    fallback: 'wss://shiden.api.onfinality.io/public-ws',
    favicon: 'icons/shiden.png',
    isSupportContract: true,
    prefix: 0x150,
    typeDef: typeDefs.plasmCollatorDefinitions,
    key: endpointKey.SHIDEN
  },
  {
    networkAlias: 'dusty-testnet',
    displayName: 'Dusty Network (Testnet)',
    info: 'The test network of the layer 2 scaling blockchain, Dusty Plasm Network',
    endpoint: 'wss://dusty.astar.network',
    favicon: 'https://polkadot.js.org/apps/static/dusty.16cf115c.png',
    isSupportContract: true,
    typeDef: typeDefs.dustyDefinitions,
    key: endpointKey.DUSTY
  },
  {
    networkAlias: 'shibuya-testnet',
    displayName: 'Shibuya Network (Testnet)',
    info: 'The test network of the layer 2 scaling blockchain',
    endpoint: 'wss://rpc.shibuya.astar.network',
    favicon: 'https://polkadot.js.org/apps/static/shiden.a066789e.png',
    isSupportContract: true,
    prefix: 0xff51,
    typeDef: typeDefs.plasmCollatorDefinitions,
    key: endpointKey.SHIBUYA
  },
  {
    networkAlias: 'local-node',
    displayName: 'Local Network',
    endpoint: 'ws://127.0.0.1:9944',
    favicon: 'icons/astar.png',
    isSupportContract: true,
    typeDef: typeDefs.plasmCollatorDefinitions,
    key: endpointKey.LOCAL
  },
  {
    networkAlias: 'custom-node',
    displayName: 'Custom Network',
    endpoint: 'ws://127.0.0.1:9944',
    favicon: 'icons/astar.png',
    isSupportContract: true,
    typeDef: typeDefs.dustyDefinitions,
    key: endpointKey.CUSTOM
  }
];
