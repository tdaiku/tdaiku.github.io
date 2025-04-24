module.exports = function(ctx) {
    return {
        plugins: [
            require('postcss-import')({
                plugins: [
                    require('stylelint')
                ]
            }),
            require('postcss-mixins'),
            require('postcss-custom-properties'),
            require('postcss-utilities'),
            require('postcss-nested'),
            require('postcss-assets')({
                cacheBuster: true,
                basePath: 'www/',
                loadPaths: ['resources/img'],
                relative: true,
            }),
            require('css-mqpacker'),
            require('autoprefixer')({
                browsers: 'last 2 versions',
            }),
            require("postcss-reporter")({clearReportedMessages: true}),
            require('cssnano')({zindex: false})
        ]
    }
};
