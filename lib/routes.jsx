import { FlowRouter } from 'meteor/kadira:flow-router';
import { mount } from 'react-mounter';
import React from 'react';

import Home from '../imports/ui/Home.jsx';
import Login from '../imports/ui/Login.jsx';
import Contact from '../imports/ui/Contact.jsx';
import About from '../imports/ui/About.jsx';
import Friends from '../imports/ui/Friends.jsx';
import Hashtags from '../imports/ui/Hashtags.jsx';
import Topic from '../imports/ui/Hashtags.jsx';

import Header from '../imports/ui/layout/Header.jsx';
import MainLayout from '../imports/ui/layout/MainLayout.jsx';
import Footer from '../imports/ui/layout/Footer.jsx';


FlowRouter.route("/", {
	name: "Home",
	action(params) {
		renderMainLayoutWith(<Home />);
	}
});

FlowRouter.route("/login", {
	name: "Login",
	action(params) {
		renderMainLayoutWith(<Login />);
	}
});

FlowRouter.route("/hashtags", {
	name: "Hashtags",
	action(params) {
		renderMainLayoutWith(<Hashtags />);
	}
});

FlowRouter.route("/friends", {
	name: "Friends",
	action(params) {
		renderMainLayoutWith(<Friends />);
	}
});

FlowRouter.route("/contact", {
	name: "Contact",
	action(params) {
		renderMainLayoutWith(<Contact />);
	}
});

FlowRouter.route("/about", {
	name: "About",
	action(params) {
		renderMainLayoutWith(<About />);
	}
});

// Dyanamic Routing for Hashtag Threads
FlowRouter.route("/hashtags/:tag", {
	action(params) {
		renderMainLayoutWith(<Topic hashtag={params.tag} />);
	}
});

function renderMainLayoutWith(component) {
	mount(MainLayout, {
		header : <Header />,
		content: component,
		footer: <Footer />
	});
}
