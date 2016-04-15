import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

export const Comments = new Mongo.Collection('comments');

if(Meteor.isServer) {
    Meteor.publish('comments',function(){
        return Comments.find({});
    });
}

Meteor.methods({
	'comments.insert'(text, postId) {

		check(text, String);

		// Make sure the user is logged in before inserting a post
    	if (! Meteor.userId()) {
      		throw new Meteor.Error('not-authorized');
    	}

		Comments.insert({
                text: text,
                postId: postId,
                userId: Meteor.user()._id,
                points: 0,
                upvoters: [],
                username: Meteor.user().username || Meteor.user().profile.name,
                createdAt: moment().format('MMMM Do YYYY, h:mm:ss a'),
                time: new Date().getTime()
        });

        // console.log("Comment inserted");
	}
})