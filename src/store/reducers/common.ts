/** @format */
import { cr } from '@utils';
import { ActionTypes } from '@store/actions/common';

// 用户信息类型
interface UserInfo {
	name: string;
	qq: number;
	age: number;
	sex: '男' | '女';
}

const commonReducer: Record<string, Store.Reducer> = {
	todos: cr([], {
		[ActionTypes.ADD_TODO](state: unknown[], action: { text: unknown }) {
			return state.concat([action.text]);
		},
	}),
	counter: cr(1, {
		[ActionTypes.INCREMENT](state: number) {
			return state + 1;
		},
		[ActionTypes.DECREMENT](state: number) {
			return state - 1;
		},
		[ActionTypes.UPDATA](state: number, { number }: { number: number }) {
			return number;
		},
	}),
	// 用户信息
	UserInfo: cr(null, {
		[ActionTypes.UPTATAUSERINFO](state: UserInfo | null, { UserInfo }: { UserInfo: UserInfo }) {
			return UserInfo;
		},
	}),
};
export default commonReducer;
