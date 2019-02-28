import type_check from './type_check.js';

const URL = 'http://localhost:4000/';

const redirect = where => {
    location.replace(`${URL}?pages=${where}`);
}

const back = where => {
    const root = document.getElementById('root');

    const button = document.createElement('button');
    button.classList.add('button', 'is-info', 'is-rounded');
    button.style.position = 'absolute';
    button.style.left = 0;
    button.textContent = 'Précédent';
    button.addEventListener('click', () => redirect(where));

    root.appendChild(button);
}

const banner = titleLabel => {
    const root = document.getElementById('root');

    const hero = document.createElement('section');
    hero.classList.add('hero', 'is-medium', 'is-bold');

    const heroBody = document.createElement('div');
    heroBody.classList.add('hero-body');
    
    const title = document.createElement('h1');
    title.classList.add('title');
    title.textContent = titleLabel;

    root.appendChild(hero);
    hero.appendChild(heroBody);
    heroBody.appendChild(title);
}


export default class DefaultPage {
    constructor() {
        this.root = document.getElementById('root');
        this.root.classList.add('has-text-centered', 'container');
        banner('Octogone');
        this.menu();
    }

    menu() {
        const button = document.createElement('button');
        button.textContent = 'Jouer';
        button.classList.add('button', 'is-info', 'is-medium', 'is-rounded');
        button.addEventListener('click', () => redirect('name'));

        this.root.appendChild(button);
    }
}

export class Name {
    constructor() {
        this.root = document.getElementById('root');
        this.root.classList.add('has-text-centered', 'container');
        back('menu');
        banner('Entrez vos noms');
        this.input();
    }

    input() {
        const error = document.createElement('article');
        error.classList.add('message', 'is-danger');
        error.style.display = 'none';
        
        const errorHeader = document.createElement('div');
        errorHeader.classList.add('message-header');

        const errorLabel = document.createElement('p');

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
        error.appendChild(errorHeader);
        errorHeader.appendChild(errorLabel);
        this.root.appendChild(labelJoueur1);
        this.root.appendChild(inputJoueur1);
        this.root.appendChild(labelJoueur2);
        this.root.appendChild(inputJoueur2);
        this.root.appendChild(button);
    }
  
    onPlay() {
        const name1 = document.getElementById("idJoueur1").value;
        const name2 = document.getElementById("idJoueur2").value;

        if (name1 && name2 && type_check(name1, 'string') && type_check(name2, 'string')) {
            localStorage.setItem('name1', name1);
            localStorage.setItem('name2', name2);
            redirect('game');
        } else {
            const error = document.querySelector('article');
            const errorLabel = document.querySelector('p');

            error.style.display = 'block';
            errorLabel.textContent = 'Les noms doivent être valides.';
        }
    }
}

export class Game {
    constructor(Alpha, Beta) {
        this.j1 = new Alpha();
        this.j2 = new Beta();
        this.j1.name = localStorage.getItem('name1');
        this.j2.name = localStorage.getItem('name2');
        this.root = document.getElementById('root');
        this.root.classList.add('has-text-centered', 'container');
        this.player = ~~(Math.random() * (2 - 1 + 1)) + 1;

        this.gameLoop();
        this.loop = setInterval(() => this.gameLoop(), 5000);    
    }

    gameLoop()  {
        if (this.j1.hp && this.j2.hp) {
            this.player = this.player === 1 ? 2 : 1;
            this.root.innerHTML = '';
            back('name');
            const section = document.createElement('section');
            section.id = 'game-screen';
            section.classList.add('columns');
            banner(`Au tour de ${this.j().name} de jouer`);
            this.root.appendChild(section);



            this.gameScreen();
        } else {
            clearInterval(this.loop);
        }
    }

    j() {
        return this.player === 1 ? this.j1 : this.j2;
    }

    opponent() {
        return this.player === 1 ? this.j2 : this.j1;
    }

    gameScreen() {
        const section = document.getElementById('game-screen');
 
        if (this.player === 1) {
            section.appendChild(this.spells());
        }
        section.appendChild(this.battleground(this.j1));
        section.appendChild(this.battleground(this.j2));
        if (this.player === 2) {
            section.appendChild(this.spells());
        }
    }

    battleground(j) {
        const section = document.createElement('section');
        section.classList.add('column', 'content');
        section.textContent = `${j.name} ${j.hp} hp`;

        return section;
    }

    spells() {
        const section = document.createElement('section');
        section.classList.add('column', 'content');
        section.textContent = 'SPELLS';

        const list = document.createElement('ol');
        for (let [key, value] of Object.entries(this.j().spells)) {
            const spell = document.createElement('li');
            spell.textContent = `${key} inflige ${value}`;
            spell.dataset.spell = key;
            spell.addEventListener('click', e => this.onSpell(e));
            list.appendChild(spell);
        }
        section.appendChild(list);

        return section;
    }

    onSpell(e) {
        const spell = e.target.dataset.spell;
        this.j().attack(spell, this.opponent());

        clearInterval(this.loop);
        if (this.j1.hp > 0 && this.j2.hp > 0) {
            this.gameLoop();
            this.loop = setInterval(() => this.gameLoop(), 5000);
        } else {
            localStorage.setItem('winner', this.j1.hp > 0 ? this.j1.name : this.j2.name);
            redirect('results');
        }
    }
}

export class Results {
    constructor() {
        this.root = document.getElementById('root');
        this.root.classList.add('has-text-centered', 'container');
        back('menu');
        banner(`${localStorage.getItem('winner')} a gagné le combat !`);
    }
}
