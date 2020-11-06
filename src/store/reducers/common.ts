/** @format */
import { cr } from '@utils/index';
import { ActionTypes } from '@store/actions/common';

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
};
export default commonReducer;
