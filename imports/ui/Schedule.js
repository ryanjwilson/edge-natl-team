import React from 'react';

import Application from './Application';
import Header from './Header';
import Footer from './Footer';
import EventList from './EventList';

export default Schedule = () => {
	return (
		<div>
			<Header />

			<div className="public-page-content">
				<div className="public-page-content__tournaments">
					<EventList />
				</div>
				<div className="public-page-content__application">
					<Application />
				</div>
			</div>

			<Footer />
		</div>
	);
};
