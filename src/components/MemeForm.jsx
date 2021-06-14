import React, { useState } from 'react';
import { colors } from '../utils/colorOptions';
import '../css/MemeForm.css';
const MemeForm = ({ handleMemeForm }) => {
	const INITIAL_STATE = { topLine: '', fontColor: 'white', fontSize: 40, topPadding: 30 };
	// future: add a bottom line
	const [ formData, setFormData ] = useState(INITIAL_STATE);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((fData) => ({ ...fData, [name]: value }));
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		handleMemeForm(formData);
		setFormData(INITIAL_STATE);
	};
	return (
		<React.Fragment>
			<form className='MemeForm' onSubmit={handleSubmit}>
				<div>
					<label htmlFor='topLine'>Top Line</label>
					<input
						type='text'
						id='topLine'
						name='topLine'
						value={formData.topLine}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='fontSize'>Font Size</label>
					<input
						type='number'
						id='fontSize'
						name='fontSize'
						min='30'
						max='75'
						placeholder='40'
						value={formData.fontSize}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='topPadding'>Top Padding</label>
					<input
						type='number'
						id='topPadding'
						name='topPadding'
						min='0'
						max='75'
						placeholder='30'
						value={formData.topPadding}
						onChange={handleChange}
					/>
				</div>
				<div>
					<label htmlFor='fontColor'>Font Color</label>
					<select name='fontColor' value={formData.fontColor} onChange={handleChange}>
						<option key='unselected' value=''>
							{''}
						</option>
						{colors.map((color) => (
							<option key={color} value={color}>
								{color}
							</option>
						))}
					</select>
				</div>
				<div>
					<button type='submit'>Submit</button>
				</div>
			</form>
		</React.Fragment>
	);
};
export default MemeForm;
