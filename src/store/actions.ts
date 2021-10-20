import { ActionTree, ActionContext } from 'vuex';
import { GeneralState as State } from './state';
import { GeneralMutations as Mutations } from './mutations';
import { ActionTypes } from './action-types';
import { MutationTypes } from './mutation-types';

export type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<State, State>, 'commit'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface GeneralActions {}

export const actions: ActionTree<State, State> & GeneralActions = {
  [ActionTypes.SHOW_ALERT_MSG]({ commit }, { msg, alertType }) {
    commit(MutationTypes.SET_SHOW_ALERT_MSG, true);
    commit(MutationTypes.SET_ALERT_MSG, msg);
    commit(MutationTypes.SET_ALERT_TYPE, alertType);
    setTimeout(() => {
      commit(MutationTypes.SET_SHOW_ALERT_MSG, false);
    }, 3000);
  },
  [ActionTypes.SET_LOADING]({ commit }, { loading }) {
    commit(MutationTypes.SET_LOADING, loading);
  },
  [ActionTypes.SET_ALL_ACCOUNT]({ commit }, { allAccount }) {
    commit(MutationTypes.SET_ALL_ACCOUNTS, allAccount);
    const allAccountName = Object.values(allAccount).map(
      (obj: any) => obj.option.name
    );
    commit(MutationTypes.SET_ALL_ACCOUNT_NAMES, allAccountName);
  }
};
