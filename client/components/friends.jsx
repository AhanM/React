Friends = React.createClass({
	mixins : [ReactMeteorData],

	getMeteorData() {
		return { 
			friendlist: function() {
		       friendList = Session.get('friends').data;
		       friend = [];

		       for (i = 0; i < friendList.length; i++)
		       {
		            friend.push(friendList[0].name);
		       };

		       return friend.toString();
		   }
		}
	},

	getInitialState() {
		if(Meteor.user() != null) {
	        Meteor.call("getFriendsData", function(error, friends) {
	            if (error) {
	                console.log(error);
	            } else {
	                Session.set('friends', friends);
	            }
	        });
    	}
    	return {data: []};
	},

	render() {
		return  (
			<div className="container">
	        	<strong>Friends List : </strong>
	        	<br />
	        	{ this.data.friendlist() }
	    	</div>
	    )
	}
});