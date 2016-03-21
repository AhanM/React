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
				console.log("Logged in!");
				console.log("routing to home");
				FlowRouter.go("Home");
			}

		});
	},
	render() {
		return (
			<div className="container" id="login-container">
					<div className="col-lg-3" id="cal">
						<h2>Login</h2>
				        <form className="form-group" onSubmit={ this.onSubmit }>
				            <input name="username" type="text" className="form-control" placeholder="Username" />
				            <input name="password" type="password" className="form-control" placeholder="Password" id="password-box" />
				            <span className="container">
				                <a>Sign Up</a> | <a> Forgot Password?</a>
				                <button className="btn btn-primary" id="login-btn">Login</button>
				            </span>
				        </form>
				    </div>
			</div>
		);
	}
})