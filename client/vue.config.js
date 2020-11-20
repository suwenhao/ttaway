const path = require("path")
const proxyApi = [
  '/api',
];

function mapProxy(proxyApi) {
  result = {};
  proxyApi.forEach(api => {
    result[api] = {
      target: "http://localhost:3001",
      changeOrigin: true,
      secure: false
    }
  });
  return result;
}

module.exports = {
  assetsDir: './static',
  configureWebpack: {
    externals: {
      'vue': 'Vue',
      'vant': 'vant',
      'vue-lazyload': 'VueLazyload',
      'babel-polyfill': 'babelPolyfill',
      'nprogress': 'NProgress',
      'axios': 'axios'
    }
  },
  css: {
    loaderOptions: {
      stylus: {
        'resolve url': true,
        'import': []
      },
      less: {
        modifyVars: {
          '@button-primary-color': '#222',
          '@button-primary-background-color': '#ffd84d'
        }
      }
    }
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, "./src/assets/style/variable.less")]
    }
  },
  devServer: {
    contentBase: "./dist",
    proxy: {
      ...mapProxy(proxyApi)
    }
  }
}
