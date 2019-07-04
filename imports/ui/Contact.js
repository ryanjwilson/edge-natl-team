import React from 'react';

import Footer from './Footer';
import Header from './Header';
import ContactForm from './ContactForm';

export default class Contact extends React.Component {
	render() {
		return (
			<div>
				<Header />

				<div className="public-page-content">
					<div className="public-page-content__contact">
						<ContactForm />
					</div>
				</div>

				<Footer />
			</div>
		);
	}
}
