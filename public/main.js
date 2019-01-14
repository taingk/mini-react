
import Router from './router.js';

class Component {
	constructor(props = {}) {
		if (!this.propTypes) this.propTypes = {}
		const arrayKeysPropTypes = Object.keys(this.propTypes);
		const arrayKeysProps = Object.keys(props);

		switch (true) {
			case typeof props !== 'object':
				throw 'props need to be object.';
			case arrayKeysPropTypes.length === 0 && arrayKeysProps.length:
				throw 'there is no propTypes.';
			case arrayKeysPropTypes.length !== arrayKeysProps.length:
				throw 'number of propTypes doesn\'t match number of props.';
			case !arrayKeysPropTypes.every(key => this.type_check_v1(props[key], this.propTypes[key])):
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
	
	display(newProps) {
		this.props = newProps;
		this.shouldUpdate();
	}

	shouldUpdate() {
		const root = document.getElementById('root');
		const autoClosingTag = [
			'<area />',
			'<base />',
			'<br />',
			'<col />',
			'<embed />',
			'<hr />',
			'<img />',
			'<input />',
			'<link />',
			'<meta />',
			'<param />',
			'<source />',
			'<track />',
			'<wbr />'
		];

		const varMatches = this.render().match(/\{{(\w*)\}}/g);
		let component = this.render();

		varMatches.forEach(match => {
			const value = match.substr(2).slice(0, -2).trim();

			component = component.replace(new RegExp(match, 'g'), eval(value));
		});

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
		return `Je suis un texte : {{this.props.text}}`;
	}
}


var Hello = () => `Hello ezaea`;

Text.prototype.propTypes = {
	text: 'number',
	abc: 'string',
}

// const text = new Text({ abc: 'abc', text: 4 });
// console.log(text);
// new Text({ abc: 'abc', text: 4 });
new Log();

const routes = { 
	routes: [
		'/',
		'/log',
	]
}

new Router(routes);
