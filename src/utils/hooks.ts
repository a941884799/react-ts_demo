/** @format */
/**
 * 自定义Hooks
 */
import {useState, useEffect, useRef, SetStateAction} from 'react'

/**
 * @Descripttion: 组件卸载后不调用setStatu,防止异步动作里的setStatu报错
 * @Author: WangLonggang
 * @Date: 2020-09-25 11:00:00
 * @param {S | (() => S)} initialState 初始状态,选填
 * @return 返回处理后的state、setStateSafe
 */
export function useStateSafe<S>(initialState?: S | (() => S)) {
  const [state, setState] = useState<S>(initialState)
  const isMounted = useRef(true)
  useEffect(() => () => (isMounted.current = false), [])
  const setStateSafe = (value: SetStateAction<S>) => {
    if (isMounted.current) {
      setState(value)
    }
  }
  return [state, setStateSafe]
}

export default {useStateSafe}
