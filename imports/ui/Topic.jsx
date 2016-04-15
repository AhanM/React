import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Post from './Post.jsx';
import { Posts } from '../api/posts.js';

// Topic class
export default class Topic extends Component {
	constructor(props) {
		super(props);

		var handle = Meteor.subscribe('posts');
	}
	fetchRelevantPosts() {
		return Posts.find({hashtags: this.props.hashtag}, {sort: {points: -1}}).fetch();
	}

	renderPosts() {
		const relevantPosts = this.fetchRelevantPosts();

		return relevantPosts.map((post) => {
			return <Post key={post._id} post={post} />
		});

	}


	render() {

	
		return (
			<div className="container" id="custom-container">
		        <center className="page-header">
		            <h2><strong>#{ this.props.hashtag }</strong></h2>
		            
		            <ul className="list-group">
						{ this.renderPosts() }
		            </ul>

		        </center>
		    </div>

		)
	}
}

Topic.PropTypes = {
	hashtag: PropTypes.string.isRequired,
};
