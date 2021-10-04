import { MutationTree } from 'vuex';
import { MutationTypes } from './mutation-types';
import { ConnectionType, GeneralState as State, Theme } from './state';
import type { InjectedExtension } from '@polkadot/extension-inject/types';
import { ApiPromise } from '@polkadot/api';

export interface GeneralMutations<S = State> {
  [MutationTypes.SET_INITIALIZED](state: S): void;
  [MutationTypes.SET_LOADING](state: S, isLoading: boolean): void;
  [MutationTypes.SET_SHOW_ALERT_MSG](state: S, showAlert: boolean): void;
  [MutationTypes.SET_ALERT_MSG](state: S, msg: string): void;
  [MutationTypes.SET_ALERT_TYPE](state: S, type: string): void;
  [MutationTypes.SET_API](state: S, type: ApiPromise): void;
  [MutationTypes.SET_EXTENSIONS](state: S, type: InjectedExtension[]): void;
  [MutationTypes.SET_CURRENT_NETWORK_STATUS](
    state: S,
    networkStatus: ConnectionType
  ): void;
  [MutationTypes.SET_CURRENT_NETWORK_IDX](state: S, networkIdx: number): void;
  [MutationTypes.SET_CURRENT_ACCOUNT_IDX](state: S, accountIdx: number): void;
  [MutationTypes.SET_CURRENT_CUSTOM_ENDPOINT](state: S, endpoint: string): void;
}

export const mutations: MutationTree<State> & GeneralMutations = {
  [MutationTypes.SET_INITIALIZED](state) {
    state.initialized = true;
  },
  [MutationTypes.SET_LOADING](state, isLoading) {
    state.isLoading = isLoading;
  },
  [MutationTypes.SET_SHOW_ALERT_MSG](state, showAlert) {
    state.alertBox.showAlertMsg = showAlert;
  },
  [MutationTypes.SET_ALERT_MSG](state, msg) {
    state.alertBox.alertMsg = msg;
  },
  [MutationTypes.SET_ALERT_TYPE](state, type) {
    state.alertBox.alertType = type;
  },
  [MutationTypes.SET_API](state, api) {
    state.api = api;
  },
  [MutationTypes.SET_EXTENSIONS](state, extensions) {
    state.extensions = extensions;
  },
  [MutationTypes.SET_CURRENT_NETWORK_STATUS](state, networkStatus) {
    state.currentNetworkStatus = networkStatus;
  },
  [MutationTypes.SET_CURRENT_NETWORK_IDX](state, networkIdx) {
    state.currentNetworkIdx = networkIdx;
  },
  [MutationTypes.SET_CURRENT_ACCOUNT_IDX](state, accountIdx) {
    state.currentAccountIdx = accountIdx;
  },
  [MutationTypes.SET_CURRENT_CUSTOM_ENDPOINT](state, endpoint) {
    state.currentCustomEndpoint = endpoint;
  },
  [MutationTypes.SET_THEME](state: State, theme: Theme) {
    //add 'dark' class to the html tag to enable dark mode
    const htmlClasses = document.documentElement.classList;
    if (theme == 'DARK') {
      htmlClasses.add('dark');
    } else {
      htmlClasses.remove('dark');
    }
    state.currentTheme = theme;
  }
};
