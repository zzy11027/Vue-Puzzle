module.exports = {
    plugins: [
        require('postcss-import'), //需要安装 npm install postcss-import --save-dev,这句代码是会对一个js文件里面import进来的多个css放在同一个style里面，如果是多个文件引入就会生成多个
        require('autoprefixer')({
            broswers: ['>1%', 'last 5 versions', 'Firefox ESR', 'not ie < 9']
        }),
        'postcss-pxtorem': { rootValue: 32, propList: ['*'], minPixelValue: 2 }
    ]
}