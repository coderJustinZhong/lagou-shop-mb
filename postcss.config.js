module.exports = {
    plugins: {
        'postcss-pxtorem': { // 把px单位换算成rem单位
            rootValue: 37.5, // vant官方使用的是37.5
            propList: ['*']
        }
    }
}