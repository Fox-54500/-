// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
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
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/list': {
        target: 'https://ticket-api-m.mtime.cn/movie/detail.api',
        changeOrigin: true,
        pathRewrite: {
          '^/list': '/'
        }
      },
      '/credit': {
        target: 'https://api-m.mtime.cn/Movie/MovieCreditsWithTypes.api',
        changeOrigin: true,
        pathRewrite: {
          '^/credit': '/'
        }
      },
      '/selling': {
        target: 'https://api-m.mtime.cn/PageSubArea/HotPlayMovies.api',
        changeOrigin: true,
        pathRewrite: {
          '^/selling': '/'
        }
      },
      '/hotPlay': {
        target: 'https://api-m.mtime.cn/Showtime/LocationMovies.api',
        changeOrigin: true,
        pathRewrite: {
          '^/hotPlay': '/'
        }
      },
      '/upcoming': {
        target: 'https://api-m.mtime.cn/Movie/MovieComingNew.api',
        changeOrigin: true,
        pathRewrite: {
          '^/upcoming': '/'
        }
      },
      '/comment': {
        target: 'https://ticket-api-m.mtime.cn/movie/hotComment.api',
        changeOrigin: true,
        pathRewrite: {
          '^/comment': '/'
        }
      },
      '/trailer': {
        target: 'https://api-m.mtime.cn/Movie/Video.api',
        changeOrigin: true,
        pathRewrite: {
          '^/trailer': '/'
        }
      },
      '/image': {
        target: 'https://api-m.mtime.cn/Movie/ImageAll.api',
        changeOrigin: true,
        pathRewrite: {
          '^/image': '/'
        }
      },
      '/area': {
        target: 'https://api-m.mtime.cn/Showtime/HotCitiesByCinema.api',
        changeOrigin: true,
        pathRewrite: {
          '^/area': '/'
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
