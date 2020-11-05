/** @format */

declare namespace Store {
	export interface Action {
		type: string;
		[propName: string]: string;
	}
	export type Reducer = (state: unknown, action: Action) => unknown;
}
