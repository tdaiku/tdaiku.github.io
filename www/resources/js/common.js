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

        ev.preventDefault();
        ev.stopPropagation();

        if (href.length > 0) {
            if (href === '#') {
                if (className && (className.indexOf('to-top-btn') !== -1 || className.indexOf('menu-top') !== -1)) {
                    this.smoothScrollTo(0);
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
            this.smoothScrollTo(position);
        }
    }

    // スムーススクロールの実装
    smoothScrollTo(targetPosition) {
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 800; // スクロール時間（ミリ秒）
        let start = null;

        const animation = (currentTime) => {
            if (start === null) start = currentTime;
            const timeElapsed = currentTime - start;
            const run = this.ease(timeElapsed, startPosition, distance, duration);
            window.scrollTo(0, run);
            if (timeElapsed < duration) requestAnimationFrame(animation);
        };

        requestAnimationFrame(animation);
    }

    // イージング関数（easeInOutCubic）
    ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return ((c / 2) * t * t * t) + b;
        t -= 2;
        return ((c / 2) * ((t * t * t) + 2)) + b;
    }
}
