module.exports = { 
	plugins: { 'postcss-pxtorem': { rootValue: 32, propList: ['*'], minPixelValue: 2 } },
	"postcss-import": {},
    "postcss-url": {},
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {},
};