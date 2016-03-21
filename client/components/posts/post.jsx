Post = React.createClass({
	
	mixins : [ReactMeteorData],

	getMeteorData() {
		var handleComments = Meteor.subscribe('comments');

		return {
			comments: Comments.find({postId:this.props.post._id},{sort:{time:1}}).fetch(),
			commentsCount: Comments.find({postId:this.props.post._id}).count(),
			upvotedClass: function() {
			        var userId = Meteor.userId();
			        if(userId && !_.include(this.upvoters, userId)) {
			            return 'btn-primary upvoteable';
			        } else {
			            return 'disabled';
			        }
			    },
			isUpvoted: function () {

			        upvoters = this.upvoters;
			        userId = Meteor.userId();

			        if(userId && _.include(upvoters, userId)) {
			            return 'Upvoted';
			        }
			        else {
			            return 'Upvote';
			        }

			    }
		}
	},

	onSubmit(e) {
		e.preventDefault();

		var text = $(e.target).find("[name=text]").val();

        if(text!= "" && Meteor.user()) {
            Comments.insert({
                text: text,
                postId: this.props.post._id,
                userId: Meteor.user()._id,
                points: 0,
                upvoters: [],
                username: Meteor.user().username || Meteor.user().profile.name,
                createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
                time: new Date().getTime()
            });
        }

        // React.findDOMNode(this.refs.text).value = "";
        ReactDOM.findDOMNode(this.refs.text).value = "";
	},

	upvoteHandler(e) {
		e.preventDefault();
		if(this.data.isUpvoted()) {
			console.log("Error: Post already upvoted")
		} else {

        	Meteor.call('upvote', this.props.post._id);
    	}
	},

	render() {

		let { upvotedClass } = this.data;

		var listComments = this.data.comments.map(function(record){
			return <Comment key={record._id} comment={record} />
		});

		return ( 
			<div className="">
				<hr/>
			    <li className="list-group-item list-group-item-info" id="post">
			        <h4 id="username"><strong>{this.props.post.username}</strong></h4>
			        <br />
			        <p className="post-content">{this.props.post.text}</p>

			        <br />

			        <button className="upvote btn {upvotedClass()}" onSubmit={ this.upvoteHandler } id="upvote-btn"> Upvote <span className="badge">{this.props.post.points}</span></button>

			        <button className="btn btn-primary comment-btn" type="button">
			          Comments <span className="badge"> {this.data.commentsCount} </span>
			        </button>

			        <span className="post-date">Posted at {this.props.post.createdAt}</span>


			        <br />
			        <form className="insertComment" onSubmit={ this.onSubmit }>
			            <div className="form-group">
			                <input type="text" name="text" ref="text" className="form-control col-xs-12" placeholder="Write a comment..."/>
			            </div>
			        </form>
			        <br />
			        <br />
			        <ul className="list-group comments">
			            { listComments }
			        </ul>
			   	</li>

			    <br />

			</div>
		);
	}
});