import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Posts = new Mongo.Collection('posts');

if(Meteor.isServer) {
    Meteor.publish('posts', function() {
        // Show newest posts at the top
        return Posts.find({},{sort:{time:+1}});
    });
}

Meteor.methods({
	'posts.insert'(text, hashtagArray) {
		check(text, String);

		// Make sure the user is logged in before inserting a post
    	if (! Meteor.userId()) {
      		throw new Meteor.Error('not-authorized');
    	}

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
	},

	'posts.upvote'(postId) {
        var user = Meteor.user();
        // ensure that the user is logged in
        if(!user)
            throw new Meteor.Error(401, "You need to login to upvote");

        Posts.update({
            _id: postId,
            upvoters: {$ne: user._id}},
            {$addToSet: {upvoters: user._id},
            $inc: {points:1}
        });
    }

 })