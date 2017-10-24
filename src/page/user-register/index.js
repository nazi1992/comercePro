/*
* @Author: Administrator
* @Date:   2017-10-23 19:58:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-24 23:35:41
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
		//验证userName
		$('#login-username').blur(function(){
			var userName = $.trim($(this).val());
			//如果用户名为空，不做验证
			console.info(!userName);
			if(!userName)
			{
				return;
			}
			_user.checkUsername(userName,function(res){
				formError.hide();
			},function(errMsg){
				formError.show(errMsg);
			})
		})
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
			password:$.trim($('#login-password').val()),
			passwordConfirm:$.trim($('#passwordConfirm').val()),
			phone:$.trim($('#phone').val()),
			email:$.trim($('#email').val()),
			question:$.trim($('#question').val()),
			answer:$.trim($('#answer').val()),

		};
		validateResult = this.formValidate(formData); 
		//验证成功
		if(validateResult.status)
		{
			_user.register(formData,function(res){
				window.location.href='./result.html?type=register';
			},function(errMsg){
				console.info("errMSg=="+errMsg)
				formError.show(errMsg);
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
		//验证密码的长度
		if(formData.password.length<6)
		{
			result.msg = '密码长度不能少于6位';
			return result;

		}
		//验证两次输入的密码是否一致
		if(formData.password!==formData.passwordConfirm)
		{
			result.msg = '两次输入的密码不一致';
			return result;

		}
		if(!_mm.validata(formData.phone,'phone'))
		{
			result.msg = '手机号格式不正确';
			return result;

		}if(!_mm.validata(formData.email,'email'))
		{
			result.msg = '邮箱格式不正确';
			return result;

		}if(!_mm.validata(formData.question,'require'))
		{
			result.msg = '提示问题不能为空';
			return result;

		}
		if(!_mm.validata(formData.answer,'require'))
		{
			result.msg = '提示问题答案不能为空';
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
