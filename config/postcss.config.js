import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import postcssAssets from 'postcss-assets'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default function(ctx) {
    return {
        plugins: [
            postcssImport(),
            postcssNested,
            postcssAssets({
                loadPaths: ['www/resources/img/'],
                basePath: 'www/resources/img/',
                relative: true
            }),
            autoprefixer(),
            cssnano({zindex: false})
        ]
    }
};
