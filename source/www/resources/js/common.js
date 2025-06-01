import 'babel-polyfill';

export default class Common {
    constructor() {
        this.isSP = (navigator.userAgent.indexOf('iPhone') > -1 && navigator.userAgent.indexOf('iPad') === -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
        this.pageLinks = document.querySelectorAll('a[href^="#"]');
    }

    initEvent() {
        this.pageLinks.forEach((link) => {
            link.addEventListener('click', this.onClickPageLink.bind(this));
        });
    }

    onClickPageLink(ev) {
        const href = ev.currentTarget.getAttribute('href');
        const target = document.querySelector(href);
        const className = ev.currentTarget.getAttribute('class');

        ev.stopPropagation();

        if (href.length > 0) {
            if (href === '#') {
                if (className && (className.indexOf('to-top-btn') !== -1 || className.indexOf('menu-top') !== -1)) {
                    window.scrollTo({
                        top: 0,
                        behavior: 'smooth',
                    });
                }
            } else {
                this.scrollInto(target);
            }
        }
        return false;
    }

    scrollInto(target) {
        if (target) {
            const position = target.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: position,
                behavior: 'smooth',
            });
        }
    }
}
