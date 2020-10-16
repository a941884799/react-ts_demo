/** @format */

import React from 'react';

export default function Hello(props: { msg: string }): React.ReactElement {
	return <h1>Hello,Hello,Hello{props.msg}</h1>;
}
