import React from 'react';

const Error = ({ message, className = 'Error' }) => {
	return (
		<div className={className}>
			<p>{message}</p>
		</div>
	);
};
export default Error;
