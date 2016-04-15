import React, { Component } from 'react';
import { Meteor } from 'meteor/meteor';

export default class Friends extends Component {

	getFriendsData() {
		if(Meteor.user() != null) {
	        Meteor.call("getFriendsData", function(error, friends) {
	            if (error) {
	                console.log(error);
	            } else {
	            	// console.log("Works!");
	                return friends;
	            }
	        });
    	}

    	return null;
	}

	getFriendsList() {
		console.log(this.getFriendsData());	
		
		friend = [];

		if(this.getFriendsData() != null) {
			friendList = this.getFriendsData().data;

			for (i = 0; i < friendList.length; i++)
			{
				friend.push(friendList[i].name);
			}
		}

		return friend.toString();
		   
	}

	render() {
		return (
			<div className="container">
	        	<strong>Friends List : </strong>
	        	<br />
	        	{ this.getFriendsList() }
	    	</div>			
		);
	}
}
