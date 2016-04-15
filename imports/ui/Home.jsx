import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { createContainer } from 'meteor/react-meteor-data';
import { Meteor } from 'meteor/meteor';

import { Posts } from '../api/posts.js';
import Post from './Post.jsx';
import { Comments } from '../api/comments.js';

import { HashtagCollection } from '../api/hashtags.js';

class Home extends Component {
	onSubmit(e) {
		e.preventDefault();

		var text = $(e.target).find("[name=text]").val();

		var hashtagArray = [];
        // acquiring hashtags from text
        for(var i=0; i < text.length - 1; i++) {
            if(text.charAt(i) == '#') {
                 for(var j = i+1; j < text.length; j++) {
                     if(text.charAt(j) == ' ') {
                           hashtagArray.push(text.slice(i+1,j));
                           // console.log(text.slice(i+1,j));
                           i = j;
                           break;
                     } else if(j == text.length - 1) {
                           hashtagArray.push(text.slice(i+1,j+1));
                           // console.log(text.slice(i+1,j+1));
                           break;
                     }
                 }
            }
        }

        // add hashtags to the HashtagCollection if they arent already there
        for(var i = 0; i < hashtagArray.length; i++) {
            if(HashtagCollection.find({hashtag: hashtagArray[i]}).count() == 0)
            {
            	console.log(hashtagArray[i]);
                Meteor.call('hashtags.insert', hashtagArray[i], '#'+hashtagArray[i], 1);
            }
            else {
            	console.log("increasing relevant posts for "+hashtagArray[i]);
                Meteor.call('hashtags.incRelevantPosts', hashtagArray[i]);
            }
        }


		if(text!= "") {
			Meteor.call('posts.insert', text, hashtagArray);
        }

        ReactDOM.findDOMNode(this.refs.text).value = ""

	}

	renderPosts() {

		return this.props.posts.map((post) => {
			const relevantComments = Comments.find({postId: post._id}).fetch();
			return <Post key={post._id} post={post} />
		});
	}

	render() 
	{
		let form;
		// let { currentUser, commentsCount, postsLoading } = this.data;

		if(this.props.currentUser) {
			form = (
				<form className="new-post" onSubmit={ this.onSubmit.bind(this) }>
					<div className="form-group">
						<textarea className="form-control" ref="text" name="text" placeholder="Write a bantr..." rows="2"></textarea>
						<br></br>
						<button className="btn btn-primary">Submit</button>
					</div>
				</form>
			) 
		} else {
			form = (
				<p> Please <a href="/login">login</a> to post </p>
			);
		}

		return (

				<div className="container" id="custom-container">
					<center className="page-header">
						
						<h1 className="text-center"><strong>Bantr React</strong></h1>
						<h4 className="text-center">Blaze to React in no time</h4>

						{ form }

						<ul className="list-group">
							{this.renderPosts()}
	    				</ul>

		            </center>
            	</div>
		);
	}
}

Home.PropTypes = {
	posts: PropTypes.array.isRequired,
	currentUser: PropTypes.object.isRequired,
	commentsCount: PropTypes.number.isRequired,
	postsLoading: PropTypes.object.isRequired,
};

export default createContainer( () => {
	const handlePosts = Meteor.subscribe('posts');
	const handleComments = Meteor.subscribe('comments');
	const handle = Meteor.subscribe('hashtagCollection'); 

	return  {
		posts: Posts.find({}, {sort: {time: -1}}).fetch(),
		currentUser: Meteor.user(),
		commentsCount: 0,
		postsLoading: handlePosts.ready(),
	};
}, Home);