import React, { useState } from 'react';
import loadFFmpeg from '../hooks/loadFFmpeg';
import { fetchFile } from '@ffmpeg/ffmpeg';
import { getFileType } from '../helpers';
// import VideoPlayer from './VideoPlayer';
import Error from './Error';
import MemeForm from './MemeForm';
import '../css/MainFFmpeg.css';
import {
	READ_FILE,
	WRITE_FILE,
	IMPACT_STRING,
	IN_FILENAME,
	OUT_GIF_FILENAME,
	OUT_IMAGE_FILENAME
} from '../utils/constants';
import { formatColor } from '../utils/colorOptions';
import IMPACT_TTF from '../fonts/impact.ttf';

const MainFFmpeg = () => {
	const { ready, error, ffmpeg } = loadFFmpeg();

	const [ status, setStatus ] = useState({});
	// const [ video, setVideo ] = useState();
	const [ firstFrame, setFirstFrame ] = useState();
	// const [processing, setProcessing] = useState(false)
	const [ gif, setGif ] = useState();
	const getFirstFrame = async ({ scaleWidth = '500', quality = 3 }) => {
		// write file to memory
		ffmpeg.FS(WRITE_FILE, IN_FILENAME, await fetchFile(status.file));

		// run ffmpeg
		await ffmpeg.run(
			'-i',
			IN_FILENAME,
			'-vf',
			'"select=eq(n,0)"',
			'-vf',
			`scale=${scaleWidth}:-2`,
			'-q:v',
			quality,
			OUT_IMAGE_FILENAME
		);

		// read the result
		const data = ffmpeg.FS(READ_FILE, OUT_IMAGE_FILENAME);

		// create a url
		const url = URL.createObjectURL(new Blob([ data.buffer ], { type: 'image/jpeg' }));
		setFirstFrame(url);
	};
	/**
   * makeMeme uses ffmpeg to take a file and creates a gif. 
   * 
   * I could not get bottomLine to work at this time
   * https://stackoverflow.com/questions/33255582/how-to-add-top-and-bottom-frame-to-a-video-using-ffmpeg-and-imagemagick
   * i tried :( 
   * 
   * 
   * I can't figure out how to scale in such a way to make WASM more effecient.
   * 
   * will probably need to make a function o calculate length of string in relation to font size
   */
	const makeMeme = async (formData) => {
		const { topLine, fontColor, fontSize, topPadding } = formData;
		const formattedColor = formatColor(fontColor);
		//write file to memory
		ffmpeg.FS(WRITE_FILE, IMPACT_STRING, await fetchFile(IMPACT_TTF));
		ffmpeg.FS(WRITE_FILE, IN_FILENAME, await fetchFile(status.file));

		//run ffmpeg
		await ffmpeg.run(
			'-i',
			IN_FILENAME,
			'-vf',
			`drawtext=fontfile=/${IMPACT_STRING}:text='${topLine}':fontcolor=${formattedColor}:fontsize=${fontSize}:x=(w-text_w)/2:y=${topPadding}`,
			'-t',
			'2.5',
			'-f',
			'gif',
			OUT_GIF_FILENAME
		);

		const data = ffmpeg.FS('readFile', OUT_GIF_FILENAME);
		const url = URL.createObjectURL(new Blob([ data.buffer ], { type: 'image/gif' }));
		setGif(url);
	};

	const handleFileChange = (e) => {
		if (!e.target.files.length) return;

		const name = e.target.files && e.target.files.item(0).name;

		// const name = e.target.files?.item(0).name
		const fileType = getFileType(name);
		const file = e.target.files.item(0);

		setStatus((obj) => ({ ...obj, ...fileType, file }));
	};

	if (error) {
		return <Error message={error.message} />;
	}
	// make the status.image render a component with a regular size
	// make a status.error helper, that will disable the button if error

	const handleMemeForm = (data) => {
		// should only make meme if it's a video?
		makeMeme(data);
	};

	return ready ? (
		<React.Fragment>
			<input type='file' onChange={handleFileChange} />

			<div>
				{status.file && status.video ? (
					<video controls width='350' src={URL.createObjectURL(status.file)} />
				) : null}
			</div>
			{/* {status.video && <VideoPlayer video={status.file} className='MainFFmpeg-user-file' />} */}

			{/* {status.image && (
				<img className src={URL.createObjectURL(status.file)} alt='file image' />
			)} */}

			{status.error && <p>error</p>}
			<div>
				{/* <h2>Get preview</h2>
				<button onClick={getFirstFrame} disabled={status.file ? false : true}>
					Process
				</button> */}

				{firstFrame && <img src={firstFrame} width='500' alt='first frame' />}
				{!error &&
				status.hasOwnProperty('file') && <MemeForm handleMemeForm={handleMemeForm} />}
				{gif && <img src={gif} width='500' alt='my gif' />}
			</div>
		</React.Fragment>
	) : (
		<p>loading...</p>
	);
};
export default MainFFmpeg;
