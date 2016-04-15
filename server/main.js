import { Meteor } from 'meteor/meteor';

import '../imports/api/posts.js';
import '../imports/api/comments.js';

var runAsync = require('run-async');

function Facebook(accessToken) {
    this.fb = require('fbgraph');
    this.accessToken = accessToken;
    this.fb.setAccessToken(this.accessToken);
    this.options = {
        timeout: 3000,
        pool: {maxSockets: Infinity},
        headers: {connection: "keep-alive"}
    }
    this.fb.setOptions(this.options);
}
Facebook.prototype.query = function(query, method) {
    var self = this;
    var method = (typeof method === 'undefined') ? 'get' : method;
    var data = runAsync(function(done) {
        self.fb[method](query, function(err, res) {
            done(null, res);
        });
    });
    return data.result;
}

Facebook.prototype.getUserData = function() {
    return this.query('me');
}
Facebook.prototype.getFriendsData = function() {
    return this.query('/me/friends');
}

Meteor.methods({
    getUserData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getUserData();
        console.log(data);
        return data;
    },
    getFriendsData: function() {
        var fb = new Facebook(Meteor.user().services.facebook.accessToken);
        var data = fb.getFriendsData();
        console.log(data)
        return data;
    }
});

Meteor.publish("getUserData", function () {
    return Meteor.users.find({_id: this.userId});
});

Meteor.publish("getFriendsData", function(){
    return Meteor.users.find({_id: this.userId});
});

// Meteor.startup(() => {
//   // code to run on server at startup
// });
