import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
	if(Meteor.users.find({}).count() == 0) {
		Accounts.createUser({
			username: "TestBot99",
			password: "a1b2c3d4"
		});
	}
});