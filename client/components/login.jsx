Login = React.createClass({
	
	onSubmit(e) {
		e.preventDefault();

		var self = this

		var username = $(e.target).find("[name=username]").val();
		var password = $(e.target).find("[name=password]").val();

		Meteor.loginWithPassword(username, password, function(err) {
			if(err) {
				console.log(err.reason);
			} else {
				FlowRouter.go("Home");
			}

		});
	},
	render() {
		return (
			<div className="container" id="login-container">
					<div className="col-lg-3" id="cal">
						<h1 className="login-header">Login</h1>
						<br />
				        <AccountsUIWrapper />
				    </div>
			</div>
		);
	}
});
AccountsUIWrapper = React.createClass({
  componentDidMount() {
    // Use Meteor Blaze to render login buttons
    this.view = Blaze.render(Template.loginButtons,
      ReactDOM.findDOMNode(this.refs.container));
  },
  componentWillUnmount() {
    // Clean up Blaze view
    Blaze.remove(this.view);
  },
  render() {
    // Just render a placeholder container that will be filled in
    return <span ref="container" />;
  }
});

