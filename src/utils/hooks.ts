/** @format */
/**
 * 自定义Hooks
 */
import { useState, useEffect, useRef, SetStateAction, Dispatch } from 'react';

/**
 * @desc 组件是否为挂载状态(未卸载)
 * @time 2020年12月04日 17:03:29 星期五
 * @return {Record<'current', boolean>} isMounted
 */
export function useIsMounted(): boolean {
	const isMounted = useRef(true);
	useEffect(() => () => (isMounted.current = false), []);
	return isMounted;
}

/**
 * @Descripttion: 重新封装useState,防止异步动作里的setState报错
 * @Author: WangLonggang
 * @Date: 2020-09-25 11:00:00
 * @param {S | (() => S)} initialState 初始状态,选填
 * @return 返回一个状态值和一个处理后的更新它的函数。
 */
export function useStateSafe<S>(initialState?: S | (() => S)): [S, Dispatch<SetStateAction<S>>] {
	const [state, setState] = useState<S>(initialState);
	const isMounted = useIsMounted();
	const setStateSafe = (value: SetStateAction<S>) => {
		if (isMounted.current) {
			setState(value);
		}
	};
	return [state, setStateSafe];
}

export default { useIsMounted, useStateSafe };
