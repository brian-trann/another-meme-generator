import { useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';

const loadFFmpeg = (log = true) => {
	const [ ready, setReady ] = useState(null);
	const [ error, setError ] = useState(null);
	const [ ffmpeg, setFFmpeg ] = useState(null);
	useEffect(() => {
		const load = async () => {
			try {
				const ffmpegWasm = createFFmpeg({ log });
				await ffmpegWasm.load();
				setFFmpeg(ffmpegWasm);
				setReady(true);
			} catch (error) {
				setError(error);
			}
		};
		load();
	}, []);

	return { ready, error, ffmpeg };
};

export default loadFFmpeg;
