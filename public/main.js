class Component {
	constructor(props = {}) {
		switch (true) {
			case typeof props !== 'object':
				throw 'props need to be object.';
			case !this.propTypes:
				throw 'there is no propTypes.';
			case Object.keys(this.propTypes).length !== Object.keys(props).length:
				throw 'number of propTypes doesn\'t match number of props.';
			case !Object.keys(this.propTypes).every(key => this.type_check_v1(props[key], this.propTypes[key])):
				throw 'props don\'t match propTypes.';
			default:
				this.props = props;
				this.display(props);
		}
	}

	type_check_v1 (check, type) {
		switch (true) {
			case check === null && type === 'null':
			case Array.isArray(check) && type === 'array':
			case check === undefined && type === 'undefined':
			case typeof check === type && check !== null && !Array.isArray(check):
				return true;
			default:
				return false;
		}
	}
	
	type_check_v2 (check, type) {
		switch (true) {
			case type.hasOwnProperty('type') && !type.hasOwnProperty('value') && !type.hasOwnProperty('enum'):
				return type_check_v1(check, type.type);
			case type.hasOwnProperty('type') && type.hasOwnProperty('value') && !type.hasOwnProperty('enum'):
				return type_check_v1(check, type.type) && JSON.stringify(check) === JSON.stringify(type.value);
			case !type.hasOwnProperty('type') && !type.hasOwnProperty('value') && type.hasOwnProperty('enum'):
				return check === type.enum.length;
			default:
				return false;
		}
	}

	display(newProps) {
		this.shouldUpdate();
	}

	shouldUpdate() {
		const root = document.getElementById('root');

		// const varMatches = this.render().match(/\{{(\w*)\}}/g);
		let component = this.render();

		// varMatches.forEach(match => {
		// 	const value = match.substr(2).slice(0, -2).trim();

		// 	// component = component.replace(new RegExp(match, 'g'), my_object[value]());
		// });

		// const compMatches = component.match(/\<(\w* ?)\/>/g);

		// compMatches.forEach(match => {
		// 	const value = match.substr(1).slice(0, -2).trim();
		// 	const object = new window[value]();
		// 	console.log(object);
		// 	component = component.replace(new RegExp(match, 'g'), eval(value));
		// });
		console.log(component);
		root.innerHTML += component;
	}
}

class Log extends Component {
	render() {
		return `<h1>{{Hello}}<Text/></h1>`;
	}
}

class Text extends Component {
	constructor(props) {
		super(props)
	}

	render() {
		return `Je suis un texte : ${this.props.text}`;
	}
}


var Hello = () => `Hello ezaea`;

Text.prototype.propTypes = {
	text: 'number',
	abc: 'string',
}

const text = new Text({ abc: 'abc', text: 4 });
console.log(text);

// new Log();

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
