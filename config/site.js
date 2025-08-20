import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const url = require('url');

const {meta, variables, scripts, pages} = JSON.parse(readFileSync(resolve(__dirname, 'site.json'), 'utf8'));

// 最後のスラッシュを除去する
const untrailingslash = (path) => {
    if (path.lastIndexOf('/') === path.length - 1) {
        // 最後にスラッシュがついている場合は取る
        path = path.substr(0, path.length - 1);
    }
    return path;
};

// 先頭にスラッシュを付ける
const prefixslash = (path) => {
    if (path.charAt(0) !== '/') {
        path = `/${path}`;
    }

    return path;
};

// 末尾にスラッシュを付ける
const trailingslash = (path) => {
    if (path.charAt(path.length - 1) !== '/') {
        // htmlで終わってるパスの末尾にはスラッシュをつけない
        if (path.match(/\.html/)) {
            return path;
        }

        // 最後にスラッシュがついてない場合はつける
        path = `${path}/`;
    }

    return path;
};

// /foo/bar.htmlとなってるかどうかのチェック
const isFile = (filepath) => {
    const matches = filepath.match('.+/(.+?)([?#;].*)?$');
    return matches && matches.length > 0;
};

export default () => {
    const shareText = encodeURIComponent(meta.shareText);
    const encodeUrl = encodeURIComponent(meta.url);

    // 日本語版シェア文言
    meta.twitterText = `https://twitter.com/intent/tweet?text=${shareText}${encodeUrl}`;
    meta.facebookText = `http://www.facebook.com/sharer.php?u=${encodeUrl}`;
    meta.lineText = `http://line.naver.jp/R/msg/text/?${shareText}%0D%0A${encodeUrl}`;

    // 英語版シェア文言
    const encodeUrlEn = encodeURIComponent(variables.en_url);
    meta.twitterTextEn = `https://twitter.com/intent/tweet?text=${shareText}${encodeUrlEn}`;
    meta.facebookTextEn = `http://www.facebook.com/sharer.php?u=${encodeUrlEn}`;
    meta.lineTextEn = `http://line.naver.jp/R/msg/text/?${shareText}%0D%0A${encodeUrlEn}`;

    // 簡体字版シェア文言
    const encodeUrlCn = encodeURIComponent(variables.cn_url);
    meta.twitterTextCn = `https://twitter.com/intent/tweet?text=${shareText}${encodeUrlCn}`;
    meta.facebookTextCn = `http://www.facebook.com/sharer.php?u=${encodeUrlCn}`;
    meta.lineTextCn = `http://line.naver.jp/R/msg/text/?${shareText}%0D%0A${encodeUrlCn}`;

    return {
        scripts,
        // ページ情報はメタ情報とマージしたリストを渡す
        pages: pages.map((page) => {
            const result = Object.assign({}, meta, variables, page, page.variables || {});

            // ページ情報にタイトルがある場合は、`ページタイトル | サイトタイトル`の形式にする
            if (page.title) {
                result.title = `${page.title} | ${meta.title}`;
            }

            // ページ毎のルートからのパスを指定
            if (process.env.APP_ENV === 'production' || process.env.APP_ENV === 'staging') {
                const urlObject = url.parse(meta.url);
                let {pathname} = urlObject;
                pathname = process.env.PUBLIC_PATH ? process.env.PUBLIC_PATH : pathname;
                // 末尾のスラッシュ無し
                pathname = untrailingslash(pathname);

                let {rootPath} = page;
                // 先頭はスラッシュあり、末尾はスラッシュ無し
                rootPath = untrailingslash(prefixslash(rootPath));

                result.pathname = pathname + rootPath;
                result.redirect = pathname;
            } else {
                result.pathname = '';
                result.redirect = '';
            }

            // リダイレクトURLの設定
            const {alternatePath, canonicalPath} = page.variables;
            let redirect = '';
            if (alternatePath) {
                redirect = alternatePath;
            } else if (canonicalPath) {
                redirect = canonicalPath;
            }

            // 先頭スラッシュ、末尾スラッシュを付ける
            redirect = prefixslash(redirect);
            if (!isFile(redirect)) {
                redirect = trailingslash(redirect);
            }
            result.redirect += redirect;

            return result;
        }),
    };
};
