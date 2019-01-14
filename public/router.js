class Router {
	constructor(props) {
		super(props);
	}

	ucfirst(str) {
	    return str.charAt(0).toUpperCase() + str.substring(1);
	}

	render() {
		const compToRender = this.ucfirst(this.props.routes.find((route) => location.pathname === route).substr(1));
		if (compToRender) return new compToRender;
	}
}

export default Router;