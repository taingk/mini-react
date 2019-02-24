import Router from '../modules/router.js';
import DefaultPage, { Name, Game, Results } from '../modules/pages.js';
import { Arthur, Enzo } from '../modules/fighters.js';

const routes = {
    'default': DefaultPage,
    'name': Name,
    'game': Game,
    'results': Results
};

new Router(routes);

const j1 = new Arthur();
const j2 = new Enzo();

j1.attack('BDF', j2);

console.log(j1, j2)

j2.attack('RASENGAN', j1);

console.log(j1, j2)