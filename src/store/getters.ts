import { GetterTree } from 'vuex';
import { AlertBox, GeneralState as State, Theme } from './state';
import { ApiPromise } from '@polkadot/api';
import type { InjectedExtension } from '@polkadot/extension-inject/types';

export interface GeneralGetters {
  initialized(state: State): boolean;
  isLoading(state: State): boolean;
  showAlert(state: State): AlertBox;
  api(state: State): ApiPromise | undefined;
  extensions(state: State): InjectedExtension[];
  networkStatus(state: State): string;
  networkIdx(state: State): number;
  accountIdx(state: State): number;
  customEndpoint(state: State): string;
  theme(state: State): Theme;
}

export const getters: GetterTree<State, State> & GeneralGetters = {
  initialized: (state) => state.initialized,
  isLoading: (state) => state.isLoading,
  showAlert: (state) => state.alertBox,
  api: (state) => state.api,
  extensions: (state) => state.extensions,
  networkStatus: (state) => state.currentNetworkStatus,
  networkIdx: (state) => state.currentNetworkIdx,
  accountIdx: (state) => state.currentAccountIdx,
  customEndpoint: (state) => state.currentCustomEndpoint,
  theme: (state: State) => state.currentTheme
};
