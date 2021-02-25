/**
 * 定义vuex导出数据
 *
 */
export default {
  user: (state) => state.user,
  userId: (state) => state.user.userID,
  token: (state) => state.user.token,
};
