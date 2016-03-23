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
})

function renderMainLayoutWith(component) {
	ReactLayout.render(MainLayout, {
		header : <Header />,
		content: component,
		footer: <Footer />
	});
}
