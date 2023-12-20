import { patternEmail } from "../constants/constants.js";

// Check user input and set error message on popup
export function checkUserInput(userInput, form) {
    let hasError = false;
    // Trim user input
    const verifiedInput = Object.fromEntries(Object.entries(userInput).map(([k, v]) => [k, v.trim()]));

    // Get all error messages
    const errorsFields = form.querySelectorAll('.error');

    // Check email
    if ('email' in verifiedInput) {
        const email = verifiedInput.email;
        const errorMsgEmail = errorsFields[0];

        let error;
        if (email === '') {
            hasError = true;
            error = 'Email is required';

        } else if (email.match(patternEmail) === null) {
            hasError = true;
            error = 'Email is invalid';

        } else {
            error = '';
        }

        errorMsgEmail.textContent = error;
        errorMsgEmail.style.display = error ? 'block' : 'none';
    }

    // Check extension name
    if ('extensionName' in verifiedInput) {
        const extensionName = verifiedInput.extensionName;
        const errorMsgExtensionName = errorsFields[1];

        let error;
        if (extensionName === '') {
            hasError = true;
            error = 'Extension name is required'

        } else if (extensionName.length < 5 || extensionName.length > 100) {
            hasError = true;
            error = 'Extension name must be between 5 and 100 characters';

        } else {
            error = '';
        }

        errorMsgExtensionName.textContent = error;
        errorMsgExtensionName.style.display = error ? 'block' : 'none';
    }

    // Check password
    if ('password' in verifiedInput) {
        const password = verifiedInput.password;
        const errorMsgPassword = errorsFields[2];

        let error;
        if (password === '') {
            hasError = true;
            error = 'Password is required'

        } else if (password.length < 8 || password.length > 20) {
            hasError = true;
            error = 'Password must be between 8 and 20 characters';

        } else {
            error = '';
        }

        errorMsgPassword.textContent = error;
        errorMsgPassword.style.display = error ? 'block' : 'none';
    }

    return {
        verifiedInput,
        hasError
    }
}