/*
* @Author: Administrator
* @Date:   2017-10-16 20:42:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-18 21:15:20
*/
var conf = {
	serverHost : ''
};
var Hogan =  require('hogan');
var _mm = {
	request:function(param)
	{	var _this = this;
		$.ajax({
			type:param.method || 'get',
			url:param.url || '',
			dataType:param.type||'json',
			data:param.data ||'',
			success:function(res)
			{
				if(0 === res.status)
				{
					typeof param.succuss ==='function' && param.success(res.data,res.msg);
				}
				//没有登录状态，需要登录
				else if(10 === res.status)
				{
					_this.doLogin();
				}//请求数据错误
				else if(1 === res.status)
				{
					typeof param.error ==='function' && param.error(res.data,res.msg);

				}
			},
			error:function(err)
			{

				typeof param.error ==='function' && param.error(err.status);

			}
		});
	},
	getServerUrl:function(path){
		//获取服务器地址
		return conf.serverHost + path;
	},
	getUrlParam:function(name){
		//获取url参数
		var reg = new RegExp('(^|&)' + name+'=([^$]*)(&|$)');
		var result = window.location.search.substr(1).match(reg);
		return result?decodeURIComponent(result[2])  : null;
	},
	//渲染html模板( npm install hogan --save),把传入的模板和数据进行拼接
	renderHtml:function(htmlTemplate,data){
		var template = Hogan.compile(htmlTemplate),
		result = template.render(data);
		return result;
	},
	//成功提示
	successTips :function(msg)
	{
		alert(msg||'操作成功');
	},//错误提示
	errorTips :function(msg)
	{
		alert(msg||'哪里不对了-~');
	},//字段的验证 ，支持非空，手机,邮箱的判断
	validate :function(value,type)
	{
		var value = $.trim(value);
		//非空验证
		if('require'===type){
			return !!value;
		}	
		//手机号验证
		if('require'===type)
		{
			return /^1\d{10}$/.test(value);
		}
		//邮箱格式验证
		if('require'===type)
		{
			return /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/.test(value);
		} 
	},
	//统一登录处理
	doLogin:function(){
		window.location.href='./login.html?redirect='+encodeURIComponent(window.location.href);
	},//跳转回主页
	goHome:function()
	{
		window.location.href = './index.html';
	}
};
//这种方式可以用于返回一些全局共享的常量或者变量，例如
module.exports = _mm;