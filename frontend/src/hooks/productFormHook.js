import { useReducer } from 'react';
import { produce } from 'immer';
import { validate } from 'utils/validators';

const useProductForm = product => {
	const initialFormState = {
		formIsValid: false,
		images: product?.images || [],
		inputs: {
			name: {
				value: product?.name || '',
				isValid: !!product?.name,
				isTouched: false,
				isChanged: false
			},
			description: {
				value: product?.description || '',
				isValid: !!product?.description,
				isTouched: false,
				isChanged: false
			},
			price: {
				value: product?.price || '',
				isValid: !!product?.price,
				isTouched: false,
				isChanged: false
			},
			countInStock: {
				value: product?.countInStock || '',
				isValid: !!product?.countInStock,
				isTouched: false,
				isChanged: false
			}
		}
	};

	const formReducer = (state, action) =>
		produce(state, draft => {
			switch (action.type) {
				case 'CHANGE':
					let formIsValid = true;
					let formIsChanged = false;
					// run validators for current input
					let inputIsValid = validate(action.payload.value, action.validators);
					// determine whether input is changed
					const inputIsChanged =
						initialFormState.inputs[action.payload.id].value.toString() !==
						action.payload.value;
					// loop over form inputs in state to set form validity
					for (const inputId in state.inputs) {
						if (inputId === action.payload.id) {
							// if current inputId matches dispatched id
							// set formIsValid based on dispatched id
							formIsValid = formIsValid && inputIsValid;
							formIsChanged = formIsChanged || inputIsChanged;
						} else {
							// if current inputId does not match dispatched id
							// set formIsValid based on state value of matched id
							formIsValid = formIsValid && state.inputs[inputId].isValid;
							formIsChanged = formIsChanged || state.inputs[inputId].isChanged;
						}
					}
					formIsValid = formIsValid && formIsChanged;
					draft.inputs[action.payload.id].isChanged = inputIsChanged;
					draft.formIsValid = formIsValid;
					draft.inputs[action.payload.id].value = action.payload.value;
					draft.inputs[action.payload.id].isValid = inputIsValid;
					break;
				case 'TOUCH':
					draft.inputs[action.payload.id].isTouched = true;
					break;
				case 'UPLOAD_IMAGE':
					let uploadedArr = [...state.images];
					uploadedArr.push({ path: action.payload, label: '' });
					draft.images = uploadedArr;
					let uploadValid = true;
					for (const inputId in state.inputs) {
						uploadValid = uploadValid && state.inputs[inputId].isValid;
					}
					draft.formIsValid = uploadValid;
					break;
				case 'DELETE_IMAGE':
					let deletedArr = [...state.images];
					deletedArr.splice(action.payload, 1);
					draft.images = deletedArr;
					let valid = true;
					for (const inputId in state.inputs) {
						valid = valid && state.inputs[inputId].isValid;
					}
					draft.formIsValid = valid;
					break;
				case 'IMAGE_LABEL':
					draft.images[action.index].label = action.payload.value;
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

export default useProductForm;
