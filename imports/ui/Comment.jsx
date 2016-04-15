import React, { Component, PropTypes } from 'react'

export default class Comment extends Component {
	render() {
		return (
			<div>
				<li className="list-group-item">
			        <div>
			            <a className="comment-author"><strong>{this.props.comment.username}:</strong> </a> 
			            <p className="comment-body"> {this.props.comment.text}</p>

			        </div>

			        <div className="date" id="comment-date">Commented at {this.props.comment.createdAt}</div>
			        <br />
		    	</li>	
		    </div>
		);
	}
}

Comment.PropTypes = {
	comment: PropTypes.object.isRequired,
};
