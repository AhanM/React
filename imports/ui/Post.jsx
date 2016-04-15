import React, { Component, PropTypes } from 'react'
import { Meteor } from 'meteor/meteor';
import ReactDOM from 'react-dom';

import { Comments } from '../api/comments.js';
import Comment from './Comment.jsx';

export default class Post extends Component {
	constructor(props) {
		
		super(props);
		const handleComments = Meteor.subscribe('comments');

	}

	onSubmit(e) {
		e.preventDefault();

		var text = $(e.target).find("[name=text]").val();

        if(text!= "") {
            Meteor.call('comments.insert', text, this.props.post._id);
        }
        this.forceUpdate();

        ReactDOM.findDOMNode(this.refs.text).value = "";
	}

	isUpvoted() {
		// console.log("IsUpvoted trigggered");

        userId = Meteor.userId();

        if(userId && _.include(this.props.post.upvoters, userId)) {
            return true;
        }
        else {
            return false;
        }
	}

	upvoteHandler(e) {
		e.preventDefault();

		if(this.isUpvoted()) {
			console.log("Error: Post already upvoted")
		} else {

        	Meteor.call('posts.upvote', this.props.post._id);
    	}
	}

	renderComments() {
		const comments = Comments.find({postId:this.props.post._id}).fetch();

		return comments.map((comment) => {
			return <Comment key={comment._id} comment={comment} />
		});
	}

	getCommentsCount() {
		return Comments.find({postId:this.props.post._id}).count();
	}

	render() {

		const upvotedClass = !this.isUpvoted() ? 'upvote btn btn-primary upvoteable' : 'upvote btn disabled';
		const upvote = this.isUpvoted() ? 'Upvoted' : 'Upvote';

		return (
			<div className="">
				<hr/>
			    <li className="list-group-item list-group-item-info" id="post">
			        <h4 id="username"><strong>{this.props.post.username}</strong></h4>
			        <br />
			        <p className="post-content">{this.props.post.text}</p>

			        <br />

			        <button className={ upvotedClass } onClick={ this.upvoteHandler.bind(this) } id="upvote-btn"> {upvote} <span className="badge">{this.props.post.points}</span></button>

			        <button className="btn btn-primary comment-btn" type="button">
			          Comments <span className="badge"> { this.getCommentsCount() } </span>
			        </button>

			        <span className="post-date">Posted at {this.props.post.createdAt}</span>


			        <br />
			        <form className="insertComment" onSubmit={ this.onSubmit.bind(this) }>
			            <div className="form-group">
			                <input type="text" name="text" ref="text" className="form-control col-xs-12" placeholder="Write a comment..."/>
			            </div>
			        </form>
			        <br />
			        <br />
			        <ul className="list-group comments">
			            { this.renderComments() }
			        </ul>
			   	</li>

			    <br />

			</div>
		);
	}
}

Post.PropTypes = {
	post: PropTypes.object.isRequired,
	// comments: PropTypes.array.isRequired,
};