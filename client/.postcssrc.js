module.exports = {
    "plugins": {
        "postcss-import": {},
        "postcss-url": {},
        // "autoprefixer": {},
        "postcss-aspect-ratio-mini": {},
        "postcss-cssnext": {},
        "postcss-px-to-viewport": {
            viewportWidth: 750,     //视窗的宽度，对应的是我们设计稿的宽度，一般是750
            unitPrecision: 3,       //指定`px`转换为视窗单位值的小数位数（很多时候无法整除）
            viewportUnit: 'vw',     //指定需要转换成的视窗单位，建议使用vw
            propList: ['*', '!font', '!font-size'],
            selectorBlackList: ['.ignore', '.hairlines'],  //指定不转换为视窗单位的类，可以自定义，可以无限添加,建议定义一至两个通用的类名
            minPixelValue: 1,       // 小于或等于`1px`不转换为视窗单位
            mediaQuery: false       // 允许在媒体查询中转换`px`
        },
        "postcss-viewport-units": {},
        "cssnano": {
            preset: "advanced",
            autoprefixer: false,
            "postcss-zindex": false //只要启用了这个插件，z-index的值就会重置为1,一定关闭
        }
    }
}