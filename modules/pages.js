const URL = 'http://localhost:4000/';

export default class DefaultPage {
    constructor() {
        console.log('Menu');
    }
}

export class Name {
    constructor() {
        console.log('Name');
        //location.replace(`${URL}?pages=game`);
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
