Hashtags = React.createClass({

	mixins : [ReactMeteorData],

	getMeteorData() {
		// var postsHandle = Meteor.subscribe('posts');
		var handle = Meteor.subscribe('hashtagCollection'); 

		

		var options = {
		    keepHistory: 1000 * 60 * 5,
		    localSearch: true
		};

		var fields  = ['text'];

		return {
			hashtagsLoading: ! handle.ready(),

			hashtagsList: function() {
        		return HashtagCollection.find({}, {sort: {relevantPosts: -1}});
    		},

			getHashtags: function() {
				return HashtagSearch.getData({
		            transform: function(matchText, regExp) {
		                return matchText.replace(regExp, "<b>$&</b>")
		            },
		            sort: {relevantPosts: -1}
		        });
			}
		};
	},

	render() {
		let isLoading;
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
				<form className="new-topic">
			        <div className="">
			            <input type="text" id="search-box" className="form-control input" rows="1" placeholder="Search for Hashtags" />
			        </div>
			    </form>
			    <div class="row">  
			    	{ isLoading }
			    </div>

			    <ul className="list-group">
				    
			    </ul>
			</div>
		)
	}

});

// HashtagResult = React.createClass({

// })