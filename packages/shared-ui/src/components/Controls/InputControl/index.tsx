import { useState, useEffect, ChangeEvent, memo } from 'react';
import Addon from './Addon';
import InputIcon from './InputIcon';
import { forwardRef } from 'react';
import './style.css';
import { InputProps } from '../type';

export default forwardRef(function InputControl(
	{
		title,
		value,
		onChange,
		type = 'text',
		name,
		placeholder,
		helper,
		required,
		error,
		disabled,
		readOnly,
		leadingIcon,
		tailing,
		addon
	}: InputProps,
	ref: React.ForwardedRef<HTMLInputElement>
) {
	let classes = ['form-control'];
	const [val, setVal] = useState(value);

	const onInputChange = (ev: ChangeEvent<HTMLInputElement>) => {
		onChange && onChange(ev);
	};

	useEffect(() => {
		setVal(value);
	}, [value]);

	if (leadingIcon && addon) {
		throw new Error('Only accept lading icon or leading addon !');
	}

	leadingIcon && classes.push('leading-icon');
	disabled && classes.push('disabled');
	required && classes.push('required');
	readOnly && classes.push('readonly');
	addon && classes.push('addon');
	error && classes.push('error');

	return (
		<div className={classes.join(' ')}>
			{title ? <label>{title}</label> : null}
			<div className="relative form-control-wrapper flex items-center">
				{leadingIcon ? <InputIcon source={leadingIcon} /> : null}
				{addon ? <Addon text={addon} /> : null}

				<input
					ref={ref}
					type={type}
					value={val}
					name={name}
					disabled={disabled}
					readOnly={readOnly}
					onChange={onInputChange}
					placeholder={placeholder}
					className="form-input"
				/>
				{tailing ? tailing : null}
			</div>
			{helper && !error ? <p className="mt-2 text-sm text-gray-500">{helper}</p> : null}
			{error ? <p className="mt-2 text-sm text-red-500">{error}</p> : null}
		</div>
	);
});
