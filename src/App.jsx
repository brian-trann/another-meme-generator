import React, { useState } from 'react';
import MainFFmpeg from './components/MainFFmpeg';
import './App.css';

/**
 * 
 * FLOW
 * 
 * 
 * select file
 * 
 * if !jpg
 * display first frame as jpg
 * 
 * if jpg... do other stuff? lol
 * 
 * 
 * let user config ffmpeg settings?
 * use HM to create output?
 * if jpg-out exist:
 *   show form
 *   display text overlay onto gif
 * 
 * submit:
 *   run new ffmpeg to make gif
 * 
 * Need to RESIZE GIF FIRST!!!!!! otherwise the formatting wont be right!
 */

function App() {
	return (
		<div className='App'>
			<h1>Let's make a gif</h1>
			<MainFFmpeg />
		</div>
	);
}

export default App;
