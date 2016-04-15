import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';

import Post from './Post.jsx';
import { Posts } from '../api/posts.js';
import { HashtagCollection } from '../api/hashtags.js';

function SearchInit() {
	const fields  = ['text'];

	const options = {
	    keepHistory: 1000 * 60 * 5,
	    localSearch: true
	};

	HashtagSearch = new SearchSource('hashtags', fields, options);

	HashtagSearch.search("");

}


export default class Hashtags extends Component {
	constructor(props) {
		super(props);
		const handle = Meteor.subscribe('hashtagCollection');

		// console.log("onCreated triggered");

		SearchInit();
	}

	hashtagsLoading() {
		return !HashtagSearch.getStatus().loading;
	}

	onkeyUp(e) {
		var self = this;

		var funct = _.throttle(function(e) {
	        // var text = ReactDOM.findDOMNode(this.refs.text).value.trim();
	        var text = $(e.target).val().trim();
	        HashtagSearch.search(text);
	    }, 200);

	    funct(e);
	} 

	getHashtags() {
        return HashtagSearch.getData({
            transform: function(matchText, regExp) {
                return matchText.replace(regExp, "<b>$&</b>")
            },
            sort: {relevantPosts: -1}
        });
    }

	renderSearchResults() {

		// return this.getHashtags().map(function(result) {
		// 	return <HashtagResult key={result._id} result={result} />
		// });
		const allHashtags = HashtagCollection.find({}, {sort: {relevantPosts: -1}}).fetch();

		return allHashtags.map( (result) => {
			return <HashtagResult key={result._id} result={result} />
		});
		
	}

	render() {

		console.log(this.getHashtags());

		let isLoading;

		if(this.hashtagsLoading()) {
			isLoading = (
				<span id="loading-span">Searching....</span>
			)
		} else {
			isLoading = (
				<span id="loading-span">Loaded</span>
			)
		}

		return ( 

			<div className="contianer">
				<form className="new-topic" onKeyUp={ this.onkeyUp.bind(this) }>
			        <div className="">
			            <input type="text" ref="text" name="text" id="search-box" className="form-control input" rows="1" placeholder="Search for Hashtags" />
			        </div>
			    </form>
			    <div className="row">  
			    	{ isLoading }
			    </div>

			    <br />

			    <ul className="list-group">
			    	{ this.renderSearchResults() }
			    </ul>
			</div>
		)
	}
}

// Hashtag Result class
class HashtagResult extends Component {
	render() {

		var anchor = "/hashtags/"+this.props.result.hashtag;

		return (
			<div>
				<li className="list-group-item" id= "hashtagResult">
			            <a href={anchor} dangerouslySetInnerHTML={{__html: this.props.result.text}}></a>
			            <span className="badge">{ this.props.result.relevantPosts }</span>
			    </li>
			</div>
		)
	
	}
}

HashtagResult.PropTypes = {
	result: PropTypes.object.isRequired,
};

// Topic class
class Topic extends Component {
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
