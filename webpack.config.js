/**
 * [exports description]
 * @type {Object}
 */
var webpack           =  require('webpack');//引入webpack变量
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');
//环境变量的配置，dev / online   开发/线上
var WEBPACK_ENV       =  process.env.WEBPACK_ENV || 'dev';
//获取HTMl-webpack-plugin 参数的方法
var getHtmlConfig = function(name,title)
{
	return{
		template:'./src/view/'+name+'.html', //目标文件
 		filename : 'view/'+name+'.html',//编译后文件
 	  title:title,
  	inject:true,
 		hash:true,
 		chunks:['common',name]//需要打包的模块
	};
}
//webpack conifg
var config = {
     entry: {
     	'index':['./src/page/index/index.js'],
      'user-login':['./src/page/user-login/index.js'],//目标文件
      'user-register':['./src/page/user-register/index.js'],//目标文件
      'user-pass-reset':['./src/page/user-pass-reset/index.js'],//找回密码
      'user-pass-update':['./src/page/user-pass-update/index.js'],//修改密码
      'user-center':['./src/page/user-center/index.js'],//个人信息
      'user-center-update':['./src/page/user-center-update/index.js'],//个人信息
      'list':['./src/page/list/index.js'],//个人信息

      'common':['./src/page/common/index.js'],
      'result':['./src/page/result/index.js']

},
     output: {
         path: './dist',
         publicPath:'/dist',//访问文件的路径
         filename: 'js/[name].js'//编译输出文件
     },
     externals:{
     	'jquery':'window.jQuery'//加载外部变量，或外部模块
     },
     module: {
     	loaders: [
      	{ test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader","css-loader") },
      	{ test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },//字体和图片的处理
        { test: /\.string$/,loader:'html-loader'}

     ]
  	},//对css文件的处理
  	resolve :{
  		alias:{
  			node_modules:__dirname+'/node_modules',
			util:__dirname+'/src/util',
  			page:__dirname+'/src/page',
			service:__dirname+'/src/service',
			image:__dirname+'/src/image'
		}
  	},
     plugins:[
     	new webpack.optimize.CommonsChunkPlugin({
     		name :'common',//文件名,对应上面的commom
     		filename : 'js/base.js',//输出文件
     	}),//独立通用模块到js/base.js
     	new ExtractTextPlugin("css/[name].css"),//把css单独打包到文件里
     	new HtmlWebpackPlugin(getHtmlConfig('index','首页')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('user-login','用户登录')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('user-register','用户注册')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('result','用户操作')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('user-pass-reset','找回密码')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('user-pass-update','修改密码')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('list','商品列表页')),//列表页

      new HtmlWebpackPlugin(getHtmlConfig('user-center','个人中心')),//html模板的处理
      new HtmlWebpackPlugin(getHtmlConfig('user-center-update','修改个人信息')),//html模板的处理



     ]//把代码中的一些公共文件提取出来形成一个单独的文件。
 };
 if('dev' === 'WEBPACK_ENV'){
 	config.entry.common.push('webpack-dev-server/client?http://localhost:9999/');
 }
 module.exports  = config;