export default class Router {
    constructor(Pages, Alpha, Beta) {
        const uri = this.getUrlParams(window.location.search);
        this.pages = Pages;
        this.pagesName = ['name', 'game', 'results'];
        this.redirect(uri, Alpha, Beta);
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

    redirect(uri, Alpha, Beta) {
        if (uri && this.pagesName.includes(uri.pages)) {
            if (uri.pages === 'game') {
                new this.pages[uri.pages](Alpha, Beta);
            } else {
                new this.pages[uri.pages];
            }
        } else {
            new this.pages['default'];
        }
    }
}
