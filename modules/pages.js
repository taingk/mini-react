const URL = 'http://localhost:4000/';

export default class DefaultPage {
    constructor() {
        this.root = document.getElementById('root');
        this.root.classList.add('has-text-centered');
        this.banner();
        this.menu();
    }

    banner() {
        const hero = document.createElement('section');
        hero.classList.add('hero', 'is-medium', 'is-bold');

        const heroBody = document.createElement('div');
        heroBody.classList.add('hero-body');

        const container = document.createElement('div');
        container.classList.add('container');
        
        const title = document.createElement('h1');
        title.classList.add('title');
        title.textContent = 'Smash Bros ULTIMAAATE';

        this.root.appendChild(hero);
        hero.appendChild(heroBody);
        heroBody.appendChild(container);
        container.appendChild(title);
    }

    menu() {
        const button = document.createElement('button');
        button.textContent = 'Jouer';
        button.classList.add('button', 'is-info', 'is-medium', 'is-rounded');
        this.root.appendChild(button);
        button.addEventListener('click', this.onPlay);
    }

    onPlay() {
        location.replace(`${URL}?pages=name`);
    }
}

export class Name {
    constructor() {
        this.root = document.getElementById('root');
        this.root.classList.add('has-text-centered');
        this.input();
        
    }

    input() {

    }
}

export class Game {
    constructor() {
        console.log('Game');
    }
}

export class Results {
    constructor() {
        console.log('Results');
    }
}
