import postcssImport from 'postcss-import'
import postcssNested from 'postcss-nested'
import autoprefixer from 'autoprefixer'
import cssnano from 'cssnano'

export default function(ctx) {
    return {
        plugins: [
            postcssImport(),
            postcssNested,
            autoprefixer(),
            cssnano({zindex: false})
        ]
    }
};
