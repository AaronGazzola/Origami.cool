import React, { useEffect } from 'react';
import clsx from 'clsx';
import useStyles from 'styles/formStyles';
import {
	Fade,
	Modal,
	Paper,
	IconButton,
	Typography,
	TextField,
	List,
	ListItem,
	ListItemText,
	Collapse,
	Grid,
	Button,
	CircularProgress
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Close, ExpandLess, ExpandMore } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import useProfileModalForm from 'hooks/profileModalFormHook';
import {
	VALIDATOR_EMAIL,
	VALIDATOR_MINLENGTH,
	VALIDATOR_MAXLENGTH,
	VALIDATOR_REQUIRE
} from 'utils/validators';
import {
	userUpdateProfileAction,
	cancelEmailUpdateAction
} from 'actions/userActions';
import SnackBar from 'components/SnackBar';
import { CANCEL_EMAIL_UPDATE_CLEAR } from 'constants/userConstants';

const ProfileModal = ({ open, setOpen, user }) => {
	const classes = useStyles();
	const dispatch = useDispatch();
	const userUpdateProfile = useSelector(state => state.userUpdateProfile);
	const { loading } = userUpdateProfile;
	const cancelEmailUpdate = useSelector(state => state.cancelEmailUpdate);
	const {
		success: cancelEmailUpdateSuccess,
		loading: cancelEmailUpdateLoading
	} = cancelEmailUpdate;
	const [formState, formDispatch] = useProfileModalForm(user);
	const {
		inputs: {
			name,
			street1,
			street2,
			city,
			state,
			postCode,
			email,
			currentPassword,
			newPassword,
			confirmNewPassword
		},
		isValid,
		passwordIsOpen,
		addressIsOpen
	} = formState;

	useEffect(() => {
		formDispatch({
			type: 'RESET'
		});
	}, [open, cancelEmailUpdateSuccess]);

	const changeHandler = (e, validators) => {
		formDispatch({
			type: 'CHANGE',
			payload: e.target,
			validators
		});
	};
	const touchHandler = e => {
		if (!formState.inputs[e.target.id].isTouched) {
			formDispatch({ type: 'TOUCH', payload: e.target });
		}
	};

	const passwordToggleHandler = () => {
		formDispatch({ type: 'TOGGLE', payload: 'password' });
	};

	const addressToggleHandler = () => {
		formDispatch({ type: 'TOGGLE', payload: 'address' });
	};

	const submitHandler = e => {
		e.preventDefault();
		let updateFields = {
			name: name.value,
			email: email.value
		};
		if (passwordIsOpen) {
			updateFields = {
				...updateFields,
				currentPassword: currentPassword.value,
				newPassword: newPassword.value
			};
		}
		if (addressIsOpen) {
			updateFields = {
				...updateFields,
				address: {
					street1: street1.value,
					street2: street2.value,
					city: city.value,
					state: state.value,
					postCode: postCode.value
				}
			};
		}
		dispatch(userUpdateProfileAction(updateFields));
	};

	return (
		<>
			<SnackBar
				message={cancelEmailUpdateSuccess}
				clearType={CANCEL_EMAIL_UPDATE_CLEAR}
			/>
			<Modal open={open} onClose={() => setOpen(false)}>
				<Fade in={open}>
					<Paper className={classes.modalPaper}>
						<IconButton
							className={classes.close}
							onClick={() => setOpen(false)}
						>
							<Close />
						</IconButton>
						<Grid container direction='column' alignItems='center'>
							<Typography variant='h3'>Edit Profile</Typography>

							<form onSubmit={submitHandler} className={classes.modalForm}>
								<TextField
									id='name'
									label='Name'
									type='text'
									placeholder='Name'
									fullWidth
									color='secondary'
									value={name.value}
									onChange={e =>
										changeHandler(e, [
											VALIDATOR_REQUIRE(),
											VALIDATOR_MINLENGTH(2),
											VALIDATOR_MAXLENGTH(30)
										])
									}
									className={
										name.isTouched && !name.isValid
											? clsx(classes.input, classes.error)
											: name.isChanged
											? clsx(classes.input, classes.changed)
											: classes.input
									}
									onBlur={touchHandler}
									error={name.isTouched && !name.isValid}
									helperText={
										name.isTouched && !name.isValid
											? 'Name must be between 2 and 30 characters'
											: ' '
									}
								/>
								<TextField
									id='email'
									label='Email'
									type='email'
									placeholder='Email'
									fullWidth
									color='secondary'
									value={email.value}
									onChange={e =>
										changeHandler(e, [VALIDATOR_REQUIRE(), VALIDATOR_EMAIL()])
									}
									style={user.newEmail && { backgroundColor: '#e8f4fd' }}
									className={
										email.isTouched && !email.isValid
											? clsx(classes.input, classes.error)
											: email.isChanged
											? clsx(classes.input, classes.changed)
											: classes.input
									}
									onBlur={touchHandler}
									error={email.isTouched && !email.isValid}
									helperText={
										email.isTouched && !email.isValid
											? 'Please Enter a Valid Email'
											: ' '
									}
								/>
								{user.newEmail && (
									<Alert
										className={classes.input}
										severity='info'
										action={
											<Button
												color='inherit'
												size='small'
												onClick={() =>
													dispatch(cancelEmailUpdateAction(user.newEmail))
												}
											>
												{cancelEmailUpdateLoading ? (
													<CircularProgress size={15} color='secondary' />
												) : (
													'Cancel'
												)}
											</Button>
										}
									>
										Please check your inbox to confirm change to{' '}
										<strong>{user.newEmail}</strong>
									</Alert>
								)}
								<List
									className={
										addressIsOpen
											? clsx(classes.outerList, classes.outerListOpen)
											: classes.outerList
									}
								>
									<ListItem button onClick={addressToggleHandler}>
										<ListItemText
											className={!addressIsOpen ? classes.greyText : null}
											primary='Postal Address'
										/>

										{addressIsOpen ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={addressIsOpen} timeout='auto' unmountOnExit>
										<List className={classes.innerList}>
											<TextField
												id='street1'
												label='Street Address Line 1'
												type='text'
												placeholder='Street Address Line 1'
												fullWidth
												color='secondary'
												value={street1.value}
												onChange={e => changeHandler(e, [VALIDATOR_REQUIRE()])}
												className={
													street1.isTouched && !street1.isValid
														? clsx(classes.listInput, classes.error)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={!street1.isValid && street1.isTouched}
												helperText={
													street1.isTouched && !street1.isValid
														? 'Street address is requried'
														: ' '
												}
											/>
											<TextField
												id='street2'
												label='Street Address Line 2'
												type='text'
												placeholder='Street Address Line 2'
												fullWidth
												color='secondary'
												value={street2.value}
												onChange={e => changeHandler(e, [])}
												className={
													street2.isTouched && !street2.isValid
														? clsx(classes.listInput, classes.error)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={!street2.isValid && street2.isTouched}
												helperText=' '
											/>
											<TextField
												id='city'
												label='City'
												type='text'
												placeholder='City'
												fullWidth
												color='secondary'
												value={city.value}
												onChange={e => changeHandler(e, [VALIDATOR_REQUIRE()])}
												className={
													city.isTouched && !city.isValid
														? clsx(classes.listInput, classes.error)
														: city.isChanged
														? clsx(classes.listInput, classes.changed)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={city.isTouched && !city.isValid}
												helperText={
													city.isTouched && !city.isValid
														? 'City is required'
														: ' '
												}
											/>
											<TextField
												id='state'
												label='State'
												type='text'
												placeholder='State'
												fullWidth
												color='secondary'
												value={state.value}
												onChange={e => changeHandler(e, [VALIDATOR_REQUIRE()])}
												className={
													state.isTouched && !state.isValid
														? clsx(classes.listInput, classes.error)
														: state.isChanged
														? clsx(classes.listInput, classes.changed)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={state.isTouched && !state.isValid}
												helperText={
													state.isTouched && !state.isValid
														? 'State is required'
														: ' '
												}
											/>
											<TextField
												id='postCode'
												label='Post Code'
												type='number'
												placeholder='Post Code'
												fullWidth
												color='secondary'
												value={postCode.value}
												onChange={e =>
													changeHandler(e, [
														VALIDATOR_REQUIRE(),
														VALIDATOR_MINLENGTH(4)
													])
												}
												className={
													postCode.isTouched && !postCode.isValid
														? clsx(classes.listInput, classes.error)
														: postCode.isChanged
														? clsx(classes.listInput, classes.changed)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={postCode.isTouched && !postCode.isValid}
												helperText={
													postCode.isTouched && !postCode.isValid
														? 'Post Code is required'
														: ' '
												}
											/>
										</List>
									</Collapse>
								</List>
								<List
									className={
										passwordIsOpen
											? clsx(classes.outerList, classes.outerListOpen)
											: classes.outerList
									}
								>
									<ListItem button onClick={passwordToggleHandler}>
										<ListItemText
											className={!passwordIsOpen ? classes.greyText : null}
											primary='Change Password'
										/>

										{passwordIsOpen ? <ExpandLess /> : <ExpandMore />}
									</ListItem>
									<Collapse in={passwordIsOpen} timeout='auto' unmountOnExit>
										<List className={classes.innerList}>
											<TextField
												id='currentPassword'
												label='Current Password'
												type='password'
												placeholder='Current Password'
												fullWidth
												color='secondary'
												value={currentPassword.value}
												onChange={e =>
													changeHandler(e, [
														VALIDATOR_MINLENGTH(6),
														VALIDATOR_MAXLENGTH(30)
													])
												}
												className={
													currentPassword.isTouched && !currentPassword.isValid
														? clsx(classes.listInput, classes.error)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={
													!currentPassword.isValid && currentPassword.isTouched
												}
												helperText={
													currentPassword.isTouched && !currentPassword.isValid
														? 'Password must be between 6 and 30 characters'
														: ' '
												}
											/>
											<TextField
												id='newPassword'
												label='New Password'
												type='password'
												placeholder='New Password'
												fullWidth
												color='secondary'
												value={newPassword.value}
												onChange={e =>
													changeHandler(e, [
														VALIDATOR_MINLENGTH(6),
														VALIDATOR_MAXLENGTH(30)
													])
												}
												className={
													newPassword.isTouched && !newPassword.isValid
														? clsx(classes.listInput, classes.error)
														: newPassword.isChanged
														? clsx(classes.listInput, classes.changed)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={newPassword.isTouched && !newPassword.isValid}
												helperText={
													newPassword.isTouched && !newPassword.isValid
														? 'Password must be between 6 and 30 characters'
														: ' '
												}
											/>
											<TextField
												id='confirmNewPassword'
												label='Confirm New Password'
												type='password'
												placeholder='Confirm New Password'
												fullWidth
												color='secondary'
												value={confirmNewPassword.value}
												onChange={e => {
													changeHandler(e, []);
												}}
												className={
													confirmNewPassword.isTouched &&
													!confirmNewPassword.isValid
														? clsx(classes.listInput, classes.error)
														: classes.listInput
												}
												onBlur={touchHandler}
												error={
													confirmNewPassword.isTouched &&
													!confirmNewPassword.isValid
												}
												helperText={
													confirmNewPassword.isTouched &&
													!confirmNewPassword.isValid
														? 'Passwords must match'
														: ' '
												}
											/>
										</List>
									</Collapse>
								</List>
								<Button
									className={classes.button}
									type='submit'
									disabled={!isValid}
									variant='contained'
									color='secondary'
									fullWidth
								>
									{loading ? (
										<CircularProgress size={25} style={{ color: '#fff' }} />
									) : (
										'Update Profile'
									)}
								</Button>
								<Button
									onClick={() => setOpen(false)}
									className={classes.button2}
								>
									Cancel
								</Button>
							</form>
						</Grid>
					</Paper>
				</Fade>
			</Modal>
		</>
	);
};

export default ProfileModal;
