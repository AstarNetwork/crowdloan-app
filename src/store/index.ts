import {
  createStore,
  Store as VuexStore,
  CommitOptions,
  DispatchOptions
} from 'vuex';
import { GeneralState as State, state } from './state';
import { GeneralGetters as Getters, getters } from './getters';
import { GeneralMutations as Mutations, mutations } from './mutations';
import { GeneralActions as Actions, actions } from './actions';

export const store = createStore({
  state,
  getters,
  mutations,
  actions
});

export type Store = Omit<
  VuexStore<State>,
  'getters' | 'commit' | 'dispatch'
> & {
  commit<K extends keyof Mutations, P extends Parameters<Mutations[K]>[1]>(
    key: K,
    payload: P,
    options?: CommitOptions
  ): ReturnType<Mutations[K]>;
} & {
  dispatch<K extends keyof Actions>(
    key: K,
    payload: Parameters<Actions[K]>[1],
    options?: DispatchOptions
  ): ReturnType<Actions[K]>;
} & {
  getters: {
    [K in keyof Getters]: ReturnType<Getters[K]>;
  };
};

export function useStore() {
  return store as Store;
}
