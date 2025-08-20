import MicroModal from 'micromodal';
import 'babel-polyfill';
import Common from './common';

import '../css/top.css';

class Top extends Common {
    initEvent() {
        super.initEvent();
        this.initModal();
        this.initInformationNewMarks();
        this.initModalContent();
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
                // モーダルが開いた時の処理
                if (modal && modal.id) {
                    // 必要に応じて処理を追加
                }
            },
            onClose: (modal) => {
                // モーダルが閉じた時の処理
                if (modal && modal.id) {
                    // 必要に応じて処理を追加
                }
            },
        });
    }

    // InformationのNEWマークを自動設定
    initInformationNewMarks() {
        const informationLinks = document.querySelectorAll('.information-list a');
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const currentMonth = currentDate.getMonth() + 1; // 0ベースなので+1

        informationLinks.forEach((link) => {
            const dateElement = link.querySelector('.date');
            if (dateElement) {
                const dateText = dateElement.textContent.trim();
                const dateMatch = dateText.match(/(\d{4})\.(\d{2})/);

                if (dateMatch) {
                    const linkYear = parseInt(dateMatch[1], 10);
                    const linkMonth = parseInt(dateMatch[2], 10);

                    // 当月以降の場合はnewクラスを追加
                    if (linkYear > currentYear || (linkYear === currentYear && linkMonth >= currentMonth)) {
                        link.classList.add('new');
                    }
                }
            }
        });
    }

    // モーダルのコンテンツを初期化
    initModalContent() {
        const informationList = document.querySelector('.information-list');
        const modalList = document.querySelector('.modal-list');

        if (informationList && modalList) {
            // information-listの内容をクローンしてモーダルにコピー
            const clonedContent = informationList.cloneNode(true);

            // モーダル用のクラスに変更
            clonedContent.classList.remove('information-list');
            clonedContent.classList.add('modal-list');

            // 既存のコンテンツを置き換え
            modalList.innerHTML = clonedContent.innerHTML;
        }
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
