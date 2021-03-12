import React, { useState } from 'react';
import clsx from 'clsx';
import useStyles from 'styles/imageSliderStyles';
import { IconButton } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';

const ImageSlider = ({ images }) => {
	const classes = useStyles();
	const [activeImage, setActiveImage] = useState(0);
	const [prevImage, setPrevImage] = useState(0);
	const [row, setRow] = useState(0);
	const handleNextImage = () => {
		if (activeImage < images.length - 1) {
			setActiveImage(activeImage + 1);
			setPrevImage(activeImage);
			setRow(Math.floor((activeImage + 1) / 3));
		}
	};
	const handlePrevImage = () => {
		if (activeImage > 0) {
			setActiveImage(activeImage - 1);
			setPrevImage(activeImage);
			setRow(Math.floor((activeImage - 1) / 3));
		}
	};
	const handleNextRow = () => {
		if (row < Math.floor(images.length / 3)) {
			setRow(row + 1);
		}
	};

	const handlePrevRow = () => {
		if (row > 0) {
			setRow(row - 1);
		}
	};
	const handleImageSelect = index => {
		setPrevImage(activeImage);
		setActiveImage(index);
	};
	if (!images) {
		return <></>;
	} else {
		return (
			<div className={classes.container}>
				<div className={classes.active}>
					{activeImage > 0 && (
						<IconButton
							size='small'
							className={clsx(classes.activeButton, classes.back)}
							onClick={handlePrevImage}
						>
							<ChevronLeft fontSize='large' />
						</IconButton>
					)}
					{activeImage < images.length - 1 && (
						<IconButton
							size='small'
							className={clsx(classes.activeButton, classes.next)}
							onClick={handleNextImage}
						>
							<ChevronRight fontSize='large' />
						</IconButton>
					)}
					{images.map((image, index) => (
						<img
							key={image.path}
							src={image.path}
							alt={image.label}
							className={
								activeImage === index && activeImage > prevImage
									? classes.slideLeft
									: activeImage === index && activeImage < prevImage
									? classes.slideRight
									: index === 0 && activeImage === prevImage
									? null
									: classes.fadeOut
							}
						/>
					))}
				</div>
				<div className={classes.listWindowFrame}>
					<IconButton
						size='small'
						className={clsx(classes.activeButton, classes.back)}
						onClick={handlePrevRow}
					>
						<ChevronLeft fontSize='large' />
					</IconButton>
					<IconButton
						size='small'
						className={clsx(classes.activeButton, classes.next)}
						onClick={handleNextRow}
					>
						<ChevronRight fontSize='large' />
					</IconButton>
					<div className={classes.listWindow}>
						<div
							className={classes.listRow}
							style={{
								width: `${Math.ceil(images.length / 3) * 100}%`,
								transform: `translateX(${
									row * -(100 / Math.ceil(images.length / 3))
								}%) translateZ(0) scale(1, 1)`
							}}
						>
							<div
								className={classes.selector}
								style={{
									width: `${33.3333 / Math.ceil(images.length / 3)}%`,
									transform: `translate(${activeImage * 100}%)`
								}}
							>
								<div></div>
							</div>
							{images.map((image, index) => (
								<div
									key={image.path}
									className={
										index === activeImage
											? clsx(classes.listImageContainer, classes.border)
											: classes.listImageContainer
									}
									style={{
										width: `${33.3333 / Math.ceil(images.length / 3)}%`
									}}
									onClick={() => handleImageSelect(index)}
								>
									<div
										className={classes.listImage}
										style={{
											backgroundImage: `url(${image.path})`
										}}
									></div>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		);
	}
};

export default ImageSlider;
