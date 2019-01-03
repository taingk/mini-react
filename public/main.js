class Component {
	constructor(props = {}) {
		this.props = props;
		this.display(props);
	}

	display(newProps) {
		this.shouldUpdate();
	}

	shouldUpdate() {
		const root = document.getElementById('root');
		const matches = this.render().match(/\{{(.*?)\}}/g);
		let component = this.render();

		matches.forEach(match => {
			const value = match.substr(2).slice(0, -2);
			component = component.replace(new RegExp(match, 'g'), eval(value));
		});
		
		root.innerHTML += component;
	}
}

class Log extends Component {
	render() {
		return `<h1>{{Hello}}</h1>`;
	}
}

class Text extends Component {
	render() {
		return `Text`;
	}
}

const Hello = () => `Hello`;

new Log();

// class Router extends Component {
// 	constructor(props) {
// 		super(props);
// 	}

// 	ucfirst(str) {
// 	    return str.charAt(0).toUpperCase() + str.substring(1);
// 	}

// 	render() {
// 		const compToRender = this.ucfirst(this.props.routes.find((route) => location.pathname === route).substr(1));
// 		if (compToRender) return new compToRender;
// 	}
// }

// const routes = { 
// 	routes: [
// 		'/',
// 		'/log',
// 	]
// }

// new Router(routes);
