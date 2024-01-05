import { useEffect, useState } from 'react';

export const useForm = (submitHandler, initialValues, validationFunction) => {
	const [values, setValues] = useState(initialValues);
	const [isInvalidForm, setIsInvalidForm] = useState(true);
	const [formErrors, setFormErrors] = useState(() => Object.keys(initialValues).reduce((acc, inputFiledName) => (
		{ ...acc, [inputFiledName]: { isTouched: false, message: '' } }
	), {}));

	useEffect(() => {
		validateForm();

	}, [values])

	const onChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		setValues((state) => ({
			...state,
			[name]: value
		}));

		const currentError = validationFunction(name, typeof value === 'string' ? value.trim() : value);
		setFormErrors((state) => ({
			...state,
			[name]: {
				...state[name],
				message: currentError[name],
			},
		}));
	};

	const onSubmit = (e) => {
		e.preventDefault();
		const trimmedValues = Object.fromEntries(Object.entries(values).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v]));
		submitHandler(trimmedValues);
	};

	const onBlur = (e) => {
		setFormErrors((state) => ({
			...state,
			[e.target.name]: {
				...state[e.target.name],
				isTouched: true,
			},
		}));
	}

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
		onBlur
	};
}
