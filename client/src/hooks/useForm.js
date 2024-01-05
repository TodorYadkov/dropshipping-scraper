import { useState } from 'react';

export const useForm = (submitHandler, initialValues, validationFunction) => {
	const [values, setValues] = useState(initialValues);
	const [formErrorMessage, setFormErrorMessage] = useState({});
	const [isInvalidForm, setIsInvalidForm] = useState(true);

	const onChange = (e) => {
		setValues((state) => ({
			...state,
			[e.target.name]: e.target.value
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const trimmedValues = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
		submitHandler(trimmedValues);
		setValues(initialValues);
	};

	const onBlur = (e) => {
		const currentErrors = validationFunction(e.target.name, e.target.value.trim());
		setFormErrorMessage((state) => ({ ...state, ...currentErrors }));
		validateForm();
	}

	function validateForm(){
		setIsInvalidForm(
			Object.values(values).some(value => value === '') || 
			Object.values(formErrorMessage).some(error => error)
			);
	}

	return {
		values,
		formErrorMessage,
		isInvalidForm,
		onChange,
		onSubmit,
		onBlur
	};
}
