/**
 * 用户模块
 *
 */
import { storeMutations } from './../contant';

const {
  user: { resetUserState },
} = storeMutations;

const userState = {
  token: 'abc',
  userID: '',
  username: '',
  avatarSrc: '',
};

export default {
  namespaced: true,
  state: userState,
  mutations: {
    [resetUserState](state, userState) {
      Object.keys(userState).forEach((key) => {
        state[key] = userState[key];
      });
    },
  },
  actions: {},
};
