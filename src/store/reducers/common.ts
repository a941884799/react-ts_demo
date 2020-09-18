/** @format */
import {cr} from '@utils/index'
import {Types as commonTypes} from '@store/actions/common'

const commonReducer: commonTypes.obj = {
  todos: cr([], {
    [commonTypes.ADD_TODO](state, action) {
      return state.concat([action.text])
    },
  }),
  counter: cr(0, {
    [commonTypes.INCREMENT](state) {
      return state + 1
    },
    [commonTypes.DECREMENT](state) {
      return state - 1
    },
  }),
}
export default commonReducer
