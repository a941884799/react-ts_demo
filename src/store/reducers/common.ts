/** @format */
import {cr} from '@utils/index'
import {Types as commonTypes} from '@store/actions/common'

const commonReducer: Types.Obj = {
  todos: cr([], {
    [commonTypes.ADD_TODO](state: any[], action: {text: any}) {
      return state.concat([action.text])
    },
  }),
  counter: cr(0, {
    [commonTypes.INCREMENT](state: number) {
      return state + 1
    },
    [commonTypes.DECREMENT](state: number) {
      return state - 1
    },
  }),
}
export default commonReducer
