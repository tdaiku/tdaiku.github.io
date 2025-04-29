import $ from 'jquery';
import 'babel-polyfill';

export default class Common {
    constructor() {
        this.isSP = (navigator.userAgent.indexOf('iPhone') > -1 && navigator.userAgent.indexOf('iPad') === -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
        this.$pageLinks = $('a[href^="#"]');
    }

    initEvent() {
        this.$pageLinks.on('click', this.onClickPageLink.bind(this));
    }

    onClickPageLink(ev) {
        const href = $(ev.currentTarget).attr('href');
        const target = $(href);
        const className = $(ev.currentTarget).attr('class');

        ev.stopPropagation();

        if (href.length > 0) {
            if (href === '#') {
                if (className.indexOf('to-top-btn') !== -1 || className.indexOf('menu-top') !== -1) {
                    $('body,html').animate({scrollTop: 0}, 400, 'swing');
                }
            } else {
                this.scrollInto(target);
            }
        }
        return false;
    }

    scrollInto(target) {
        const speed = 400;
        if (target) {
            const position = target.offset().top;
            $('body,html').animate({scrollTop: position}, speed, 'swing');
        }
    }
}
