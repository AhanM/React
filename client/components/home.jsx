Home = React.createClass({

	mixins : [ReactMeteorData],

	getMeteorData() {
		
		var handlePosts = Meteor.subscribe('posts');
		var handle = Meteor.subscribe('hashtagCollection'); 

		return {
			currentUser: Meteor.user(), 
			postsLoading: handlePosts.ready(),
			posts: Posts.find({}, {sort: {time: -1}}).fetch()
		     
		}
	},

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

                HashtagCollection.insert({
                    hashtag: hashtagArray[i],
                    text: '#'+hashtagArray[i],
                    relevantPosts: 1
                });
            }
            else {
            	console.log("increasing relevant posts for "+hashtagArray[i]);
                Meteor.call('incRelevantPosts', hashtagArray[i]);
            }
        }


		if(text!= "" && this.data.currentUser) {
            Posts.insert({
                text: text,
                hashtags : hashtagArray,
                userId: Meteor.user()._id,
                username: Meteor.user().username || Meteor.user().profile.name,
                points: 0,
                votedUp : false,
                upvoters : [],
                createdAt : moment().format('MMMM Do YYYY, h:mm:ss a'),
                time : new Date().getTime()
            });
        }

        ReactDOM.findDOMNode(this.refs.text).value = ""

	},

	render() {
		let form;
		let { currentUser, commentsCount, postsLoading } = this.data;

		if(currentUser) {
			form = (
				<form className="new-post" onSubmit={ this.onSubmit }>
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
		
		var listPosts = this.data.posts.map(function(record) {
			return <Post key={record._id} post={record} />
		});

		return (

				<div className="container" id="custom-container">
					<center className="page-header">
						
						<h1 className="text-center">Bantr React</h1>
						<p className="text-center">Blaze to React in no time</p>

						{ form }

						<ul className="list-group">
							{ listPosts }
	    				</ul>

		            </center>
            	</div>


		);
	}
})