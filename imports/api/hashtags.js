import { Mongo } from 'meteor/mongo';
import { Meteor } from 'meteor/meteor';
// import { check } from 'meteor/check';

export const HashtagCollection = new Meteor.Collection('hashtagCollection');

if(Meteor.isServer) {

	Meteor.publish('hashtagCollection', function() {
    	return HashtagCollection.find({}, {sort: {relevantPosts: -1}});
	});

	if(HashtagCollection.find().count() == 0) {
	    HashtagCollection.insert({
	        hashtag: "MUvsMC",
	        text: "#MUvsMC",
	        relevantPosts: 0
	    });

	    HashtagCollection.insert({
	        hashtag: "FedvsNadal",
	        text: "#FedvsNadal",
	        relevantPosts: 0
	    });

	    HashtagCollection.insert({
	        hashtag: "TestHashtag",
	        text: "#TestHashtag",
	        relevantPosts: 0
	    });
	}
}

Meteor.methods({
    'hashtags.incRelevantPosts'(thisHashtag) {
        var user = Meteor.user();
        // ensure that the user is logged in
        if(!user)
            throw new Meteor.Error(401, "You need to login to Post");

        HashtagCollection.update(
            {hashtag: thisHashtag}, // Selector
            {$inc: {relevantPosts: 1}}  // Modifier
        );
	},
	'hashtags.insert'(hashtag, text, relevantPosts) {
		console.log("hashtags.insert invoked");
		HashtagCollection.insert({
            hashtag: hashtag,
            text: text,
            relevantPosts: relevantPosts
        });
	}
});