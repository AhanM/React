import React, { Component, PropTypes } from 'react';

export default class MainLayout extends Component {
	render() {
		return ( 
			<div>
				{this.props.header}

				{this.props.content}

				{this.props.footer}
			</div>
		);
	}
}

MainLayout.PropTypes = {
	header: PropTypes.object.isRequired,
	content: PropTypes.object.isRequired,
	footer: PropTypes.object.isRequired
}