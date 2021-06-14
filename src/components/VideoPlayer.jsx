import React from 'react';

const VideoPlayer = ({ className = '', width = 500, video }) => {
	return <video className={className} width={width} controls src={URL.createObjectURL(video)} />;
};
export default VideoPlayer;
