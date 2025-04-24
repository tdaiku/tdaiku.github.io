import $ from 'jquery';
import 'babel-polyfill';

import Swiper from 'swiper/js/swiper';

import gaTracking from './vendor/gaTracking';
import NoiseImage from './vendor/NoiseImage';

require('swiper/css/swiper.css');

export default class Common {
    constructor() {
        gaTracking($('[data-tracking]'));
        this.initSwiper();
        this.initPlaygroundBg();
        this.initComponent();
        this.ellipsisMultiline($('[data-row-cnt]'));
        this.isSP = (navigator.userAgent.indexOf('iPhone') > -1 && navigator.userAgent.indexOf('iPad') === -1) || navigator.userAgent.indexOf('iPod') > 0 || navigator.userAgent.indexOf('Android') > 0;
        this.$pageLinks = $('a[href^="#"]');
        this.$newsBtn = $('.open-news');
        $('.news-toggle').hide();

        this.$playgroundBtn = $('.open-playground');
        this.playgroundInitHeight = '735px';
        this.playgroundInitHeightSP = '940px';
        this.playgroundLength = $('.playground-list').get(0).scrollHeight;
        this.playgroundOpen = false;
        this.showNewsList();
    }

    initComponent() {
        const me = this;
        if (!this.isSP) {
            me.bgLogoNoiseImage = new NoiseImage($('#bg-logo-canvas'));
        }
    }

    initEvent() {
        this.$pageLinks.on('click', this.onClickPageLink.bind(this));
        this.$newsBtn.on('click', this.onClickNewsList.bind(this));
        this.$playgroundBtn.on('click', this.onClickPlaygroundList.bind(this));
    }

    initSwiper() {
        this.mySwiper = new Swiper('.swiper-container', {
            direction: 'vertical',
            effect: 'slide',
            slidesPerView: 1,
            loop: true,
            noSwiping: true,
            noSwipingClass: 'swiper-container',
            autoplay: {
                delay: 5000,
                reverseDirection: true,
                disableOnInteraction: false,
            },
        });
    }

    initPlaygroundBg() {
        const deviceWidth = $(window).width();

        if (!(this.isSP) && deviceWidth >= 1600) {
            $('#clip-top').css('transform', `scale(calc(${deviceWidth} / 1600))`);
            $('#clip-bottom').css('transform', `scale(calc(${deviceWidth} / 1600))`);
        }
    }

    // ニュースフィードを省略して末尾に…を付ける処理
    ellipsisMultiline($ellipsisTarget) {
        $ellipsisTarget.each((index, element) => {
            const $target = $(element);
            let html = $target.html();
            const rowCnt = $(element).data('row-cnt');
            // font size * line height * line count
            const fontSize = parseFloat($target.css('font-size'));
            const lineHeight = parseFloat($target.css('line-height'));
            let targetHeight = Math.ceil(fontSize * lineHeight * rowCnt);
            if ($target.css('line-height').match(/px/)) {
                targetHeight = Math.ceil(lineHeight * rowCnt);
            }
            // 対象の要素を非表示で複製する
            const $clone = $target.clone();
            $clone
                .css({
                    display: 'none',
                    position: 'absolute',
                    overflow: 'visible',
                })
                .width($target.width())
                .height('auto');
            $target.after($clone);
            // 指定した高さになるまで、1文字ずつ消去していく
            while (html.length > 0 && $clone.height() > targetHeight) {
                html = html.substr(0, html.length - 1);
                $clone.html(`${html}...`);
            }
            // 文章を入れ替えて、複製した要素を削除する
            $target.html($clone.html());
            $clone.remove();
        });
    }

    showNewsList() {
        $(window).on('load', () => {
            $('.news-toggle').removeClass('hidden');
        });
    }

    onClickNewsList() {
        $('.news-toggle').slideToggle(200);
    }

    onClickPlaygroundList() {
        if (this.playgroundOpen) {
            if (this.isSP) {
                $('.playground-list').css('height', this.playgroundInitHeightSP);
            } else {
                $('.playground-list').css('height', this.playgroundInitHeight);
            }
            $('.open-playground').removeClass('opened');
            this.playgroundOpen = false;
        } else {
            $('.playground-list').css('height', this.playgroundLength);
            $('.open-playground').addClass('opened');
            this.playgroundOpen = true;
        }
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
