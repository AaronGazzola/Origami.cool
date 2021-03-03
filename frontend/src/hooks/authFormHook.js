import { useReducer } from 'react';
import { produce } from 'immer';
import {
	validate,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_MINLENGTH,
	VALIDATOR_REQUIRE,
	VALIDATOR_EMAIL
} from 'utils/validators';

const initialFormState = {
	formIsValid: false,
	isLoginMode: true,
	inputs: {
		name: {
			value: '',
			isValid: false,
			isTouched: false,
			validators: [
				VALIDATOR_REQUIRE(),
				VALIDATOR_MINLENGTH(2),
				VALIDATOR_MAXLENGTH(30)
			],
			helperText: 'Name must be between 2 and 30 characters'
		},
		email: {
			value: '',
			isValid: false,
			isTouched: false,
			validators: [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()],
			helperText: 'Please enter a valid email address'
		},
		password: {
			value: '',
			isValid: false,
			isTouched: false,
			validators: [
				VALIDATOR_REQUIRE(),
				VALIDATOR_MINLENGTH(6),
				VALIDATOR_MAXLENGTH(30)
			],
			helperText: 'Password must be between 6 and 30 characters'
		},
		confirmPassword: {
			value: '',
			isValid: false,
			isTouched: false,
			validators: [],
			helperText: 'Passwords must match'
		}
	}
};

const formReducer = (formState, action) =>
	produce(formState, draft => {
		switch (action.type) {
			case 'CHANGE':
				// run validators for current input
				let inputIsValid = validate(action.payload.value, action.validators);
				// check if passwords match
				let passwordsMatch =
					formState.inputs.password.value ===
					formState.inputs.confirmPassword.value;
				if (
					action.payload.id === 'password' &&
					formState.inputs.confirmPassword.isTouched
				) {
					//if changing password and confirmPassword isTouched
					// set passwordsMatch
					passwordsMatch =
						action.payload.value === formState.inputs.confirmPassword.value;
				} else if (
					action.payload.id === 'confirmPassword' &&
					formState.inputs.password.isTouched
				) {
					//if chanding confirmPassword and password isTouched
					// set passwordsMatch
					passwordsMatch =
						action.payload.value === formState.inputs.password.value;
					// set inputIsValid
					inputIsValid = passwordsMatch;
				}
				// loop over form inputs in formState
				let formIsValid = true;
				// set fields to determine form validity depending on login/signup mode
				const activeFields = formState.isLoginMode
					? {
							email: formState.inputs.email,
							password: formState.inputs.password
					  }
					: formState.inputs;
				for (const inputId in activeFields) {
					if (inputId === action.payload.id) {
						// if current inputId matches dispatched id
						// set formIsValid based on dispatched id
						formIsValid = formIsValid && inputIsValid;
					} else if (inputId === 'confirmPassword') {
						// if current inputId is confirmPassword
						// set formIsValid based on passwordsMatch
						formIsValid = formIsValid && passwordsMatch;
					} else {
						// if current inputId does not match dispatched id
						// set formIsValid based on formState value of matched id
						formIsValid = formIsValid && formState.inputs[inputId].isValid;
					}
				}
				draft.formIsValid = formIsValid;
				draft.inputs[action.payload.id].value = action.payload.value;
				draft.inputs[action.payload.id].isValid = inputIsValid;
				draft.inputs.confirmPassword.isValid = passwordsMatch;

				break;
			case 'TOUCH':
				draft.inputs[action.payload.id].isTouched = true;
				break;
			case 'SWITCH_MODE':
				if (!formState.isLoginMode) {
					// Signup --> Log in
					draft.isLoginMode = true;
					// check password validity
					const passwordIsValid = validate(formState.inputs.password.value, [
						VALIDATOR_REQUIRE(),
						VALIDATOR_MINLENGTH(6),
						VALIDATOR_MAXLENGTH(30)
					]);
					draft.inputs.password.isValid = passwordIsValid;
					// set form validity
					draft.formIsValid = formState.inputs.email.isValid && passwordIsValid;
					break;
				} else {
					// Log in --> Signup
					draft.isLoginMode = false;
					// set form validity
					draft.formIsValid =
						formState.inputs.email.isValid &&
						formState.inputs.name.isValid &&
						formState.inputs.password.isValid &&
						formState.inputs.confirmPassword.value ===
							formState.inputs.password.value;
					break;
				}
			default:
				break;
		}
	});

const useAuthForm = () => {
	const [formState, formDispatch] = useReducer(formReducer, initialFormState);

	return [formState, formDispatch];
};

export default useAuthForm;
