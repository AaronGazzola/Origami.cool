import { useReducer } from 'react';
import { produce } from 'immer';
import { validate } from 'utils/validators';

const useCheckoutForm = address => {
	const initialFormState = {
		expanded: 0,
		step: 0,
		payment: 'paypal',
		addressIsValid: !!address,
		addressFormIsValid: false,
		addressFormIsChanged: false,
		addressIsOpen: false,
		addressInputs: {
			street1: {
				value: address?.street1 || '',
				isValid: !!address?.street1,
				isTouched: false,
				isChanged: false
			},
			street2: {
				value: address?.street2 || '',
				isValid: !!address?.street2,
				isTouched: false,
				isChanged: false
			},
			city: {
				value: address?.city || '',
				isValid: !!address?.city,
				isTouched: false,
				isChanged: false
			},
			state: {
				value: address?.state || '',
				isValid: !!address?.state,
				isTouched: false,
				isChanged: false
			},
			postCode: {
				value: address?.postCode || '',
				isValid: !!address?.postCode,
				isTouched: false,
				isChanged: false
			},
			country: {
				value: address?.country || '',
				isValid: !!address?.country,
				isTouched: false,
				isChanged: false
			}
		}
	};

	const formReducer = (state, action) =>
		produce(state, draft => {
			switch (action.type) {
				case 'EXPAND':
					if (state.addressIsValid) {
						draft.expanded = action.payload;
						draft.step =
							state.step < action.payload ? action.payload : state.step;
					}
					break;
				case 'CHANGE':
					let addressFormIsValid = true;
					let addressFormIsChanged = false;
					// run validators for current input
					let inputIsValid = validate(action.payload.value, action.validators);
					// determine whether input is changed
					const inputIsChanged =
						initialFormState.addressInputs[action.payload.id].value !==
						action.payload.value;

					// loop over form addressInputs in state to set form validity
					for (const inputId in state.addressInputs) {
						if (inputId === action.payload.id) {
							// if current inputId matches dispatched id
							// set addressFormIsValid based on dispatched id
							addressFormIsValid = addressFormIsValid && inputIsValid;
							addressFormIsChanged = addressFormIsChanged || inputIsChanged;
						} else {
							// if current inputId does not match dispatched id
							// set addressFormIsValid based on state value of matched id
							addressFormIsValid =
								addressFormIsValid && state.addressInputs[inputId].isValid;
							addressFormIsChanged =
								addressFormIsChanged || state.addressInputs[inputId].isChanged;
						}
					}
					addressFormIsValid = addressFormIsValid && addressFormIsChanged;
					draft.addressInputs[action.payload.id].isChanged = inputIsChanged;
					draft.addressFormIsValid = addressFormIsValid;
					draft.addressInputs[action.payload.id].value = action.payload.value;
					draft.addressInputs[action.payload.id].isValid = inputIsValid;
					break;
				case 'TOUCH':
					draft.addressInputs[action.payload.id].isTouched = true;
					break;
				case 'TOGGLE':
					draft.addressIsOpen = !state.addressIsOpen;
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

export default useCheckoutForm;
