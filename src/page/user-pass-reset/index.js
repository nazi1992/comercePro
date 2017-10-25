/*
* @Author: Administrator
* @Date:   2017-10-23 19:58:31
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-25 22:33:32
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
	data:{
		username:'',
		question:'',
		answer:'',
		token:''
	},
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function()
	{
		//显示第一步
		this.loadStepUsername();
	},
	bindEvent:function()
	{
		var _this = this;
		//用户名点击
		$('#submit-username').click(function(){
			var username = $('#reset-username').val();
			//用户名是否存
			if(username)
			{
				_user.getQuestion(username,function(res){
					_this.data.username = username;
					_this.data.question = res;//获取该用户名的提示问题
					_this.loadStepQuestion();
				},function(errMsg){
					formError.show(errMsg);
				});
			}
			else
			{
				formError.show('请输入用户名');

			}
		});
		///输入问题答案中的点击
		$('#submit-question').click(function(){
			var answer = $('#reset-answer').val();
			//用户名是否存在
			if(answer)
			{
				_user.checkAnswer({
					username:_this.data.username,
					question:_this.data.question,
					answer:answer
				},function(res){
					_this.data.answer = answer;//获取该用户名的提示问题
					_this.data.token = res;//token
					_this.loadStepPassword();
				},function(data,errMsg){
					console.info("---"+errMsg);
					formError.show(errMsg);
				});
			}
			else
			{
				formError.show('请输入密码提示问题答案');

			}
		});
		//输入新密码后
		///
		$('#submit-password').click(function(){
			var password = $('#reset-password').val();
			//password是否存在
			if(password&&password.length>=6)
			{ 
				_user.resetPassword({
					username:_this.data.username,
					passwordNew:password,
					forgetToken:_this.data.token
				},function(res){
					window.location.href='./result.html?type=pass-reset';
				},function(data,errMsg){
					formError.show(errMsg);
				});
			}
			else
			{
				formError.show('请输入不少于6位新密码');

			}
		});
	},
	//加载输入用户名的第一步
	loadStepUsername:function(){
		$('.step-username').show();
	},
	//加载输入密码提示问题的第一步
	loadStepQuestion:function(){
		//清除错误提示 
		formError.hide();
		$('.step-username').hide().siblings('.step-question').show().
		find('.question').text(this.data.question);
	},//加载输入密码的第一步
	loadStepPassword:function(){
		formError.hide();
		$('.step-question').hide().siblings('.step-password').show();
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
