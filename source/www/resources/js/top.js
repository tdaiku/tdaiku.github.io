import MicroModal from 'micromodal';
import 'babel-polyfill';
import Common from './common';

import '../css/top.css';

class Top extends Common {
    initEvent() {
        super.initEvent();
        this.initModal();
    }

    initModal() {
        // モーダルの初期化
        MicroModal.init({
            openTrigger: 'data-micromodal-trigger',
            closeTrigger: 'data-micromodal-close',
            disableScroll: true,
            disableFocus: true,
            awaitOpenAnimation: false,
            awaitCloseAnimation: false,
            onShow: (modal) => {
                // eslint-disable-next-line no-console
                console.log('Modal opened:', modal.id);
            },
            onClose: (modal) => {
                // eslint-disable-next-line no-console
                console.log('Modal closed:', modal.id);
            },
        });
    }

    // eslint-disable-next-line class-methods-use-this
    load() {
        // 必要に応じて実装
    }
}

// DOMContentLoadedイベントで初期化
document.addEventListener('DOMContentLoaded', () => {
    const top = new Top();
    top.initEvent();
    top.load();

    // リサイズイベント
    window.addEventListener('resize', () => {
        // 必要に応じて実装
    });
});
