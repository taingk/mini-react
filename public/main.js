import Router from '../modules/router.js';
import DefaultPage, { Name, Game, Results } from '../modules/pages.js';

const routes = {
    'default': DefaultPage,
    'name': Name,
    'game': Game,
    'results': Results
};

new Router(routes);