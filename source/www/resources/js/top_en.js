import $ from 'jquery';
import 'babel-polyfill';
import Common from './common';

import '../css/top_en.css';

class TopEn extends Common {}

$(() => {
    const topEn = new TopEn();
    topEn.initEvent();
    topEn.load();

    $(window).on('resize', () => {
        setTimeout(() => {
            topEn.initPlaygroundBg();
        }, 200);
    });
});
