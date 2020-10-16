/** @format */

declare namespace Types {
	export interface Action {
		type: string;
		[propName: string]: string;
	}
	export type Reducer = (state: any, action: action) => any;
}
