export default class Router {
    constructor(Pages) {
        const uri = this.getUrlParams(window.location.search);
        this.pages = Pages;
        this.pagesName = ['name', 'game', 'results'];
        this.checkURI(uri);
    }

    getUrlParams(search) {
        const hashes = search.slice(search.indexOf('?') + 1).split('&');
        const params = {};
        hashes.map(hash => {
            const [key, val] = hash.split('=');
            params[key] = decodeURIComponent(val)
        });

        return params
    }

    checkURI(uri) {
        if (uri && this.pagesName.includes(uri.pages)) {
            new this.pages[uri.pages];
        } else {
            new this.pages['default'];
        }
    }
}
