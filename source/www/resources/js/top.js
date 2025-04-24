import $ from 'jquery';
import 'babel-polyfill';
import Common from './common';

import '../css/top.css';

class Top extends Common {}

$(() => {
    const top = new Top();
    top.initEvent();
    top.load();

    $(window).on('resize', () => {
        setTimeout(() => {
            top.initPlaygroundBg();
        }, 200);
    });
});
