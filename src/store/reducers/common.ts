/** @format */
import { cr } from '@utils/store';
import { ActionTypes } from '@store/actions';

// 用户信息类型
type UserInfo = {
  name?: string;
  qq?: number;
  age?: number;
  sex?: '男' | '女';
} | null;

const commonReducer: Record<string, Store.Reducer> = {
  todos: cr<unknown[]>([], {
    [ActionTypes.ADD_TODO](state, action) {
      return state.concat([action.text]);
    },
  }),
  counter: cr<number>(1, {
    [ActionTypes.INCREMENT](state) {
      return state + 1;
    },
    [ActionTypes.DECREMENT](state) {
      return state - 1;
    },
    [ActionTypes.UPDATA](state, action) {
      return action.number;
    },
  }),
  // 用户信息
  UserInfo: cr<UserInfo>(null, {
    [ActionTypes.UPTATAUSERINFO](state, { UserInfo }) {
      return UserInfo;
    },
  }),
};
export default commonReducer;
