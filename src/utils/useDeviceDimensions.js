/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from 'react';

//DeviceDimensionsProvider is made to prived the devloper with the screen sizes at anytime
const initialState = {
	windowWidth: 1920,
	isDesktop: true,
	isNarrowOrSmaller: false,
	isTabletOrSmaller: false,
	isMobileOrSmaller: false,
};

export const DeviceDimensionsContext = createContext(initialState);

export const useDeviceDimensions = () => useContext(DeviceDimensionsContext);

const DeviceDimensionsProvider = ({ children }) => {
	const [width, setWidth] = useState({});
	const [height, setHeight] = useState({});
	const [deviceDimensions, setDeviceDimensions] = useState(initialState);

	const updateDimensions = () => {
		setWidth(window.innerWidth);
		setHeight(window.innerHeight);
	};

	useEffect(() => {
		window.addEventListener('resize', updateDimensions);
		return () => window.removeEventListener('resize', updateDimensions);
	}, [width, height]);

	useEffect(() => {
		const resizeListener = () => {
			const narrowWidth = 1024;
			const tabletWidth = 768;
			const mobileWidth = 480;

			const windowWidth = width;
			const isDesktop = windowWidth > narrowWidth;
			const isNarrowOrSmaller = windowWidth <= narrowWidth;
			const isTabletOrSmaller = windowWidth <= tabletWidth;
			const isMobileOrSmaller = windowWidth <= mobileWidth;

			setDeviceDimensions({
				windowWidth,
				isDesktop,
				isNarrowOrSmaller,
				isTabletOrSmaller,
				isMobileOrSmaller,
			});
		};

		resizeListener();
		window.addEventListener('resize', resizeListener);
		updateDimensions();
		return () => window.removeEventListener('resize', resizeListener);
	}, [width]);

	return (
		<DeviceDimensionsContext.Provider value={deviceDimensions}>
			{children}
		</DeviceDimensionsContext.Provider>
	);
};

export default DeviceDimensionsProvider;
