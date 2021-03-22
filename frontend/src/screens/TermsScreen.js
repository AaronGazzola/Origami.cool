import { Paper, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import useStyles from 'styles/contentStyles';
import React from 'react';

const AboutScreen = () => {
	const classes = useStyles();
	return (
		<>
			<Typography variant='h1' className={classes.title}>
				Terms and Conditions
			</Typography>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Business Information
				</Typography>
				<Typography className={classes.text}>
					<strong>Business Name:</strong> Apex Apps
				</Typography>
				<Typography className={classes.text}>
					<strong>ABN:</strong> 81700757157
				</Typography>
				<Typography className={classes.text}>
					<strong>Business Name Holder:</strong> Aaron Gazzola
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Payment
				</Typography>
				<Typography className={classes.text}>
					Payments will be pre-authorised at the time of placing an order. No
					goods shall be supplied without payment. Payment will be taken from
					your chosen payment method when you place your order.
				</Typography>
				<Typography className={classes.text}>
					We use PayPal’s secure payment gateway; they handle the transaction on
					our behalf and as such we do not at any time gain access to your full
					payment method details, except your address which is necessary in
					order for us to fulfil your order. We do not store credit card details
					nor do we share customer details with any 3rd parties
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Delivery
				</Typography>
				<Typography className={classes.text}>
					Orders are only accepted if the item is in stock, this allows for
					prompt postage within 2-3 business days of purchase.
				</Typography>
				<Typography className={classes.text}>
					Orders are sent via Australia Post standard parcel postage from
					Warragul, Victoria. Deliveries within Australia may take up to 6
					business days to arrive, while international orders may take up to 25
					business days.
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Notice
				</Typography>
				<Typography className={classes.text}>
					You will be responsible for any import duties and taxes on your
					international order. In addition, some orders may experience customs
					delays. Unfortunately, we have no control over these charges or delays
					and cannot predict what they may be. We suggest that you contact your
					local customs office for additional information.
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Liability
				</Typography>
				<Typography className={classes.text}>
					If the Customer establishes that any of the goods have not been
					delivered, or have been delivered damaged, or are not of the correct
					quantity, Apex Apps shall at its option, replace them with similar
					goods, or allow the Customer credit for their invoice value.
				</Typography>
				<Typography className={classes.text}>
					If the Customer establishes that any of the goods are defective Apex
					Apps shall at its option, replace them with similar goods or allow the
					Customer credit for their invoice value. In no circumstances shall the
					liability of Apex Apps to the Customer under this condition exceed the
					invoice value of the goods.
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Returns
				</Typography>
				<Typography className={classes.text}>
					If you are not satisfied with your order, you may return the items for
					a refund or replacement. The postage and handling costs for returning
					the items will not be covered by Apex Apps and must be provided by the
					customer.
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Privacy Policy
				</Typography>
				<Typography className={classes.text}>
					We are committed to protecting your privacy. You can read our full
					Privacy Policy{' '}
					<Link
						to='/privacy'
						className={classes.link}
						style={{ fontWeight: 700 }}
					>
						here.
					</Link>
				</Typography>
			</Paper>
			<Paper className={classes.aboutPaper}>
				<Typography variant='h5' className={classes.subTitle}>
					Product Specifications
				</Typography>
				<Typography className={classes.text}>
					Apex Apps reserve the right to alter specifications to those stated on
					the website, including slight differences in colour, paper and size.
				</Typography>
			</Paper>
		</>
	);
};

export default AboutScreen;
