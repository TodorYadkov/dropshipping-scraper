import { useEffect, useState } from 'react';

export const useForm = (submitHandler, initialValues, validationFunction) => {
	const [values, setValues] = useState(initialValues);
	const [isInvalidForm, setIsInvalidForm] = useState(true);
	const [formErrors, setFormErrors] = useState(() => Object.keys(initialValues).reduce((acc, inputFieldName) => (
		{ ...acc, [inputFieldName]: { isTouched: false, message: '' } }
	), {}));

	useEffect(() => {
		validateForm();

	}, [values])

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (e.target.files) {
			setValues((state) => ({ ...state, [name]: e.target.files[0] }));
		} else {
			setValues((state) => ({ ...state, [name]: value }));
		}

		const currentError = validationFunction(name, typeof value === 'string' ? value.trim() : value);
		setFormErrors((state) => ({ ...state, [name]: { ...state[name], message: currentError[name] } }));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const trimmedValues = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
		submitHandler(trimmedValues);
	};

	const onBlur = (e) => {
		const name = e.target.name;
		setFormErrors((state) => ({ ...state, [name]: { ...state[name], isTouched: true } }));
	};

	const formReset = () => {
		setValues(initialValues);
	};

	const resetError = () => {
		setFormErrors((state) => Object.keys(state).reduce((acc, inputFieldName) => (
			{ ...acc, [inputFieldName]: { isTouched: false, message: '' } }
		), {}))
	};

	function validateForm() {
		setIsInvalidForm(
			Object.values(values).some(value => value === '') ||
			Object.values(formErrors).some(error => error.message)
		);
	}

	return {
		values,
		formErrors,
		isInvalidForm,
		onChange,
		onSubmit,
		onBlur,
		formReset,
		resetError,
	};
};
