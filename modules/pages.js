import type_check from './type_check.js';

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
        const error = document.createElement('p');

        const inputJoueur1= document.createElement('input');
        const labelJoueur1= document.createElement('label');
        inputJoueur1.id='idJoueur1';
        inputJoueur1.placeholder='Nom Joueur 1';
        labelJoueur1.textContent = 'Joueur 1:';
        inputJoueur1.textContent ='Nom joueur 1';
        inputJoueur1.classList.add('input', 'is-rounded', 'is-info');
        labelJoueur1.classList.add('label');
        
        const inputJoueur2= document.createElement('input');
        const labelJoueur2= document.createElement('label');
        inputJoueur2.id='idJoueur2';
        inputJoueur2.placeholder='Nom Joueur 2';
        labelJoueur2.textContent = 'Joueur 2:';
        inputJoueur2.textContent ='Nom joueur 2';
        inputJoueur2.classList.add('input', 'is-rounded', 'is-info');
        labelJoueur2.classList.add('label');

        const button = document.createElement('button');
        button.textContent = 'Jouer';
        button.classList.add('button', 'is-info', 'is-medium', 'is-rounded');
        button.addEventListener('click', this.onPlay);

        this.root.appendChild(error);
        this.root.appendChild(labelJoueur1);
        this.root.appendChild(inputJoueur1);
        this.root.appendChild(labelJoueur2);
        this.root.appendChild(inputJoueur2);
        this.root.appendChild(button);
    }
  
    onPlay() {
        const valueInput1 = document.getElementById("idJoueur1").value;
        const valueInput2 = document.getElementById("idJoueur2").value;

        if (valueInput1 && valueInput2 && type_check(valueInput1, 'string') && type_check(valueInput2, 'string')) {
            localStorage.setItem('joueur1', valueInput1);
            localStorage.setItem('joueur2', valueInput2);
            location.replace(`${URL}?pages=game`);
        } else {
            const error = document.querySelector('p');
            error.textContent = "Les noms doivent être valides."
        }
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
