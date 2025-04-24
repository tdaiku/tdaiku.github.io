import $ from 'jquery';
import Common from './common';

import '../css/top_cn.css';

class TopCn extends Common {}

$(() => {
    const topCn = new TopCn();
    topCn.initEvent();
    topCn.load();

    $(window).on('resize', () => {
        setTimeout(() => {
            topCn.initPlaygroundBg();
        }, 200);
    });
});
