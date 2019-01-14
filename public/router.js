const Routage = () => console.log('routage');

export default Routage;

class Router extends Component {
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
		'/',
		'/log',
	]
}

new Router(routes);
