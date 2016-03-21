Home = React.createClass({

	mixins : [ReactMeteorData],

	getMeteorData() {
		
		var handlePosts = Meteor.subscribe('posts');

		// let data = {};
		// data.posts = [];

		// if(handlePosts.ready()) {
		// 	data.posts = Posts.find({}, {sort: {time: -1}}).fetch();
		// }

		// data.currentUser = Meteor.user();
		// data.commentCount = 1;
		
		// return data;		

		return {
			currentUser: Meteor.user(), 
			postsLoading: handlePosts.ready(),
			posts: Posts.find({}, {sort: {time: -1}}).fetch()
		     
		}
	},

	onSubmit(e) {
		e.preventDefault();

		var text = $(e.target).find("[name=text]").val();

		if(text!= "" && this.data.currentUser) {
            Posts.insert({
                text: text,
                // hashtags : hashtagArray,
                userId: Meteor.user()._id,
                username: Meteor.user().username || Meteor.user().profile.name,
                points: 0,
                votedUp : false,
                upvoters : [],
                createdAt : moment().format('MMMM Do YYYY, h:mm:ss a'),
                time : new Date().getTime()
            });
        }

        // React.findDOMNode(this.refs.text).value = "";
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
		
		if(postsLoading) {
			console.log("POSTS");
			console.log(this.data.posts);
		}

		var listPosts = this.data.posts.map(function(record) {
			return <Post key={record._id} post={record} />
		});

		
		// var listPosts = this.data.posts.map(function(record) {
		// 	return <Post key ={record._id} post = "record" cmtCount = {data.commentCount} />
		// });

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