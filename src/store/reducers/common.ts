/** @format */
import { cr } from '@utils/index';
import { Types as commonTypes } from '@store/actions/common';

const commonReducer: Record<string, Store.Reducer> = {
	todos: cr([], {
		[commonTypes.ADD_TODO](state: unknown[], action: { text: unknown }) {
			return state.concat([action.text]);
		},
	}),
	counter: cr(1, {
		[commonTypes.INCREMENT](state: number) {
			return state + 1;
		},
		[commonTypes.DECREMENT](state: number) {
			return state - 1;
		},
		[commonTypes.UPDATA](state: number, { number }: { number: number }) {
			return number;
		},
	}),
};
export default commonReducer;
