/**
 * getFileType is a function that returns an object of Booleans.
 * If *fileName* does not contain a '.', and does not seem like an
 * image or video, the error property will be true
 * 
 * - 'test.MOV' => { image : false, video : true, error : false }
 * - 'test.mov' => { image : false, video : true, error : false }
 * 
 * 
 * - 'test.jpg' => { image : true, video : false, error : false }
 * 
 * 
 * - 'test.doc' => { image : false, video : false, error : true }
 * 
 * 
 * Accepted image type:
 * - 'jpg','jpeg','png'
 * 
 * Accepted video types:
 * - 'm4v','mp4','mov'
 * @param {String} fileName
 * @returns  Object of Booleans { image, video, error}
 */
const getFileType = (fileName = '') => {
	// if (typeof fileName !== 'string') throw new Error('Argument must be a string');
	// if (!fileName.includes('.')) throw new Error('Does not seem like a file');
	const split = fileName.split('.');
	const fileType = split[split.length - 1].toLowerCase();

	const acceptedImageTypes = new Set([ 'jpg', 'jpeg', 'png' ]);
	const acceptedVideoTypes = new Set([ 'm4v', 'mp4', 'mov' ]);

	const isImage = acceptedImageTypes.has(fileType);
	const isVideo = acceptedVideoTypes.has(fileType);
	const error = isImage || isVideo ? false : true;

	return {
		image : isImage,
		video : isVideo,
		error
	};
};

export { getFileType };
