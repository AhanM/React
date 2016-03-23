Hashtags = React.createClass({

	mixins : [ReactMeteorData],

	getMeteorData() {
		
		var handle = Meteor.subscribe('hashtagCollection'); 

		HashtagSearch = new SearchSource('hashtags', fields, options);

		var options = {
		    keepHistory: 1000 * 60 * 5,
		    localSearch: true
		};

		var fields  = ['text'];

		return {
			hashtagsLoading: !HashtagSearch.getStatus().loaded,

			hashtagsList: HashtagCollection.find({}, {sort: {relevantPosts: -1}}).fetch(),

			getHashtags: function() {
				HashtagSearch.getData({ 
					transform: function(matchText, regExp) {
			            return matchText.replace(regExp, "<b>$&</b>")
			        },
			        sort: {relevantPosts: -1}
			    });
			}
		};
	},

	onkeyUp(e) {
		e.preventDefault();
		console.log("Key up triggered");

		_.throttle(
			function(e) {
		        var text = $(e.target).find("[name=text]").val().trim();
		        HashtagSearch.search(text); 
		    }, 200);
	},

	render() {
		let isLoading;
		
		console.log(this.data.getHashtags);

		// var listSearchResults = this.data.getHashtags().map(function(record) {
		// 		<HashtagResult key={record._id} result = {record} />
		// 	});

		var listSearchResults = this.data.hashtagsList.map(function(record) {
				return <HashtagResult key={record._id} result = {record} />
			});

		if(this.data.hashtagsLoading) {
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
				<form className="new-topic" onKeyUp={ this.onkeyUp }>
			        <div className="">
			            <input type="text" id="search-box" className="form-control input" rows="1" placeholder="Search for Hashtags" />
			        </div>
			    </form>
			    <div className="row">  
			    	{ isLoading }
			    </div>

			    <br />

			    <ul className="list-group">
			    	{ listSearchResults }
			    </ul>
			</div>
		)
	}

});

HashtagResult = React.createClass({
	render() {
		var anchor = "/hashtags/"+this.props.result.hashtag;

		return (
			<div>
				<li className="list-group-item" id= "hashtagResult">
			            <a href={ anchor }>{ this.props.result.text }</a>
			            <span className="badge">{ this.props.result.relevantPosts }</span>
			    </li>
			</div>
		)
	}
});

Topic = React.createClass({
 // Pass in the hashtag to the Topic Template

 mixins : [ReactMeteorData],

	getMeteorData() {
		var handlePosts = Meteor.subscribe('posts');

		return {
			RelevantPosts : Posts.find({hashtags: this.props.hashtag}, {sort: {points: -1}}).fetch()
		};
	},

	render() {
		var listPosts = this.data.RelevantPosts.map(function(record) {
    		return <Post key={record._id} post={record} />  
     	});	
	
		return (
			<div className="container" id="custom-container">
		        <center className="page-header">
		            <h2><strong>#{ this.props.hashtag }</strong></h2>
		            
		            <ul className="list-group">
						{ listPosts }
		            </ul>

		        </center>
		    </div>

		)
	}
});