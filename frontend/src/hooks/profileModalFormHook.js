import { useReducer } from 'react';
import { produce } from 'immer';
import { validate } from 'utils/validators';

const useProfileModalForm = user => {
	const initialFormState = {
		isValid: false,
		passwordIsOpen: false,
		addressIsOpen: false,
		inputs: {
			name: {
				value: user.name || '',
				isValid: !!user.name,
				isTouched: false,
				isChanged: false
			},
			email: {
				value: user.email || '',
				isValid: !!user.email,
				isTouched: false,
				isChanged: false
			},
			street1: {
				value: user.address?.street1 || '',
				isValid: !!user.address?.street1,
				isTouched: false,
				isChanged: false
			},
			street2: {
				value: user.address?.street2 || '',
				isValid: !!user.address?.street2,
				isTouched: false,
				isChanged: false
			},
			city: {
				value: user.address?.city || '',
				isValid: !!user.address?.city,
				isTouched: false,
				isChanged: false
			},
			state: {
				value: user.address?.state || '',
				isValid: !!user.address?.state,
				isTouched: false,
				isChanged: false
			},
			postCode: {
				value: user.address?.postCode || '',
				isValid: !!user.address?.postcode,
				isTouched: false,
				isChanged: false
			},
			currentPassword: {
				value: '',
				isValid: false,
				isTouched: false,
				isChanged: false
			},
			newPassword: {
				value: '',
				isValid: false,
				isTouched: false,
				isChanged: false
			},
			confirmNewPassword: {
				value: '',
				isValid: false,
				isTouched: false,
				isChanged: false
			}
		}
	};

	const formReducer = (state, action) =>
		produce(state, draft => {
			let formIsValid = true;
			let formIsChanged = false;
			let activeFields = {
				name: state.inputs.name,
				email: state.inputs.email
			};

			if (
				(action.payload !== 'password' && state.passwordIsOpen) ||
				(action.payload === 'password' && !state.passwordIsOpen)
			) {
				activeFields = {
					...activeFields,
					currentPassword: state.inputs.currentPassword,
					newPassword: state.inputs.newPassword,
					confirmNewPassword: state.inputs.confirmNewPassword
				};
			}
			if (
				(action.payload !== 'address' && state.addressIsOpen) ||
				(action.payload === 'address' && !state.addressIsOpen)
			) {
				activeFields = {
					...activeFields,
					street1: state.inputs.street1,
					city: state.inputs.city,
					state: state.inputs.state,
					postCode: state.inputs.postCode
				};
			}
			switch (action.type) {
				case 'CHANGE':
					// run validators for current input
					let inputIsValid = validate(action.payload.value, action.validators);
					// determine whether input is changed
					const inputIsChanged =
						initialFormState.inputs[action.payload.id].value !==
						action.payload.value;
					// check if passwords match
					let passwordsMatch =
						state.inputs.newPassword.value ===
						state.inputs.confirmNewPassword.value;

					if (
						action.payload.id === 'newPassword' &&
						state.inputs.confirmNewPassword.isTouched
					) {
						//if chanding password and confirmPassword isTouched
						// set passwordsMatch
						passwordsMatch =
							action.payload.value === state.inputs.confirmNewPassword.value;
					} else if (
						action.payload.id === 'confirmNewPassword' &&
						state.inputs.newPassword.isTouched
					) {
						//if chanding confirmPassword and password isTouched
						// set passwordsMatch
						passwordsMatch =
							action.payload.value === state.inputs.newPassword.value;
						// set inputIsValid
						inputIsValid = passwordsMatch;
					}
					// loop over form inputs in state to set form validity
					for (const inputId in activeFields) {
						if (inputId === action.payload.id) {
							// if current inputId matches dispatched id
							// set formIsValid based on dispatched id
							formIsValid = formIsValid && inputIsValid;
							formIsChanged = formIsChanged || inputIsChanged;
						} else if (inputId === 'confirmNewPassword') {
							// if current input id is confirmNewPassword, check validity based on passwordsMatch
							formIsValid = formIsValid && passwordsMatch;
							formIsChanged = formIsChanged || activeFields[inputId].isChanged;
						} else {
							// if current inputId does not match dispatched id
							// set formIsValid based on state value of matched id
							formIsValid = formIsValid && state.inputs[inputId].isValid;
							formIsChanged = formIsChanged || activeFields[inputId].isChanged;
						}
					}
					formIsValid = formIsValid && formIsChanged;
					if (state.passwordIsOpen) {
						formIsValid = formIsValid && passwordsMatch;
					}
					draft.inputs[action.payload.id].isChanged = inputIsChanged;
					draft.isValid = formIsValid;
					draft.inputs[action.payload.id].value = action.payload.value;
					draft.inputs[action.payload.id].isValid = inputIsValid;
					draft.inputs.confirmNewPassword.isValid = passwordsMatch;
					break;
				case 'TOUCH':
					draft.inputs[action.payload.id].isTouched = true;
					break;
				case 'TOGGLE':
					// loop over form inputs in state to set form validity
					for (const inputId in activeFields) {
						formIsValid = formIsValid && state.inputs[inputId].isValid;
						formIsChanged = formIsChanged || activeFields[inputId].isChanged;
					}
					draft.isValid = formIsValid && formIsChanged;
					// toggle
					if (action.payload === 'password') {
						draft.passwordIsOpen = !state.passwordIsOpen;
					} else if (action.payload === 'address') {
						draft.addressIsOpen = !state.addressIsOpen;
					}
					break;
				case 'RESET':
					return initialFormState;
				default:
					break;
			}
		});

	const [formState, formDispatch] = useReducer(formReducer, initialFormState);

	return [formState, formDispatch];
};

export default useProfileModalForm;
