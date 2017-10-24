/*
* @Author: Administrator
* @Date:   2017-10-23 19:58:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-24 23:41:04
*/
require('./index.css');
require('page/common/nav-simple/index.js');
var _user = require('service/user-service.js');
var _mm = require('util/mm.js');
//表单里的错误提示
var formError = {
	show:function(errMsg){
		$('.error-item').show().find('.errorMsg').text(errMsg);
	},
	hide:function(){
		$('.error-item').hide();
	}
};
//page逻辑部分
var page = {
	init:function(){
		this.bindEvent();
	},
	bindEvent:function()
	{
		var _this = this;
		$('#submit').click(function(){
			_this.submit();

		});
		//回车的时候也进行提交。
		$('.login-content').keyup(function(e){
			if(e.keyCode===13)
			{
				_this.submit();
			}
		});
	},
	//提交表单
	submit:function(){
		var formData = {
			username:$.trim($('#login-username').val()),
			password:$.trim($('#login-password').val())
		};
		validateResult = this.formValidate(formData); 
		//验证成功
		if(validateResult.status)
		{

			_user.login(formData,function(res){
				console.info("jinr------");
				window.location.href=_mm.getUrlParam('redirect') ||'./index.html';
			},function(errMsg){
				formError.show(errMsg);
														console.info("jinr2------");

			});
			//提交

		}
		else
		{
			//提示错误
			formError.show(validateResult.msg);

		}
	},
	//表单验证
	formValidate:function(formData){
		var result = {
			status:false,
			msg:''
		};
		console.info(formData.username+"--"+formData.password);
		if(!_mm.validata(formData.username,'require'))
		{
			result.msg = '用户不能为空';
			return result;
		}
		if(!_mm.validata(formData.password,'require'))
		{
			result.msg = '密码不能为空';
			return result;

		}
		//通过验证，返回正确提示
		result.status = true;
		result.msg = '验证通过';
		return result;
	}
};
$(function(){
	page.init();
});
