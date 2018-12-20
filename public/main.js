class MiniReact {
	constructor(props = {}) {
		this.props = props;
		this.render();
	}
}

class Log extends MiniReact {
	render() {
		console.log('je suis un log');
	}
}

class Router extends MiniReact {
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

const routes = { 
	routes: [
		'/log',
	]
}

new Router(routes);
