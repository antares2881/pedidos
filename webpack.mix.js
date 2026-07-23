const mix = require('laravel-mix');

const VuetifyLoaderPlugin = require('vuetify-loader/lib/plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');

var webpackConfig = {
    plugins: [
        new VuetifyLoaderPlugin(),
        new CaseSensitivePathsPlugin()
    ]
}

mix.webpackConfig( webpackConfig );
/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.js('resources/js/app.js', 'public/js').vue()
    .options({ processCssUrls: false })
    .version();

if (mix.inProduction()) {
    mix.webpackConfig({
        optimization: {
            splitChunks: {
                chunks: 'all',
                cacheGroups: {
                    // Vuetify's loader injects common framework modules into
                    // many lazy screens. Extract only modules shared by at
                    // least two chunks; screen-specific widgets stay local.
                    vuetifyShared: {
                        test: /[\\/]node_modules[\\/]vuetify[\\/]/,
                        name: 'vendor-vuetify-shared',
                        chunks: 'async',
                        minChunks: 2,
                        priority: 30,
                        reuseExistingChunk: true
                    },
                    // Keep SheetJS isolated: only export/report screens should
                    // pay its ~300 KB cost.
                    xlsx: {
                        test: /[\\/]node_modules[\\/]xlsx[\\/]/,
                        name: 'vendor-xlsx',
                        chunks: 'async',
                        priority: 25,
                        enforce: true,
                        reuseExistingChunk: true
                    },
                    searchSelect: {
                        test: /[\\/]node_modules[\\/]vue-search-select[\\/]/,
                        name: 'vendor-search-select',
                        chunks: 'async',
                        priority: 20,
                        enforce: true,
                        reuseExistingChunk: true
                    }
                }
            }
        }
    });
}
