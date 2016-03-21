Header = React.createClass({

	mixins : [ReactMeteorData],
	getMeteorData() {
		return {
			currentUser: Meteor.user()
		}
	},

	handleLogout() {
		Meteor.logout();
	},

	render() {
		let loginButton;
		let { currentUser } = this.data;

		if (currentUser) {
			loginButton = (
				<li className=""><a href="#" onClick={ this.handleLogout }>Logout</a></li>
			)
		} else {
			loginButton = (
				<li className=""><a href="/login">Login</a></li>
			)
		}

		return (
			<div className="navbar navbar-default navbar-static-top" id="nav">
				<div className="container">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
					</div>
					<div className="collapse navbar-collapse">
						<ul className="nav navbar-nav">
							<li className=""><a href="/">Home</a></li>
							<li className=""><a href="/contact">Contact</a></li>
							{ loginButton }
							<li className=""><a href="/hashtags">Trending</a></li>
							<li className=""><a href="/friends">Friends</a></li>
						</ul>
						<ul className="nav navbar-nav navbar-right">
							<form className="navbar-form navbar-left" role="search">
								<div className="form-group">
									<input type="text" className="form-control" placeholder="Search" />
								</div>
							</form>
							<li className=""><a href="/about">About</a></li>
						</ul>
					</div>
				</div>
			</div>
		);
	}

})