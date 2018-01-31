// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../dist/index.html'),
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: './static',
        assetsPublicPath: './',
        productionSourceMap: true,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8004,
        autoOpenBrowser: true,
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/house': {
                target: 'https://doc.trc.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/house': '/house'
                }
            },
            '/account': {
                target: 'http://devtest.360taihe.com/',
                changeOrigin: true,
                pathRewrite: {
                    '^/account': '/account'
                }
            },
            '/funds-account-admin': {
                target: 'http://10.200.4.140:7001/',
                changeOrigin: true,
                pathRewrite: {
                    '^/funds-account-admin': '/account'
                }
            },
            '/funds-ecard-admin': {
                target: 'http://10.200.4.140:7001/',
                changeOrigin: true,
                pathRewrite: {
                    '^/funds-ecard-admin': '/ecard'
                }
            },
            '/funds-checkstand-admin': {
                target: 'http://10.200.4.140:7001/',
                changeOrigin: true,
                pathRewrite: {
                    '^/funds-checkstand-admin': '/checkstand'
                }
            },
            '/funds-report-admin': {
                target: 'http://10.200.4.140:7001/',
                changeOrigin: true,
                pathRewrite: {
                    '^/funds-report-admin': '/report'
                }
            },
            '/funds-score-admin': {
                target: 'http://10.200.4.140:7001/',
                changeOrigin: true,
                pathRewrite: {
                    '^/funds-score-admin': '/score'
                }
            }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}