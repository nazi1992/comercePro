/*
* @Author: Administrator
* @Date:   2017-10-26 20:33:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-31 00:00:45
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var page1 = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		//初始化左边菜单
		navSide.init({
			name:'user-pass-update'
		})
		this.loadUserInfo();
	},
	bindEvent:function()
	{
		_this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				passwordOld:$.trim($('#password-old').val()),				
				password:$.trim($('#user-password').val()),				
				ensurePassword:$.trim($('#ensurePassword').val()),
			};
			var validateResult = _this.validateForm(userInfo);

			if(validateResult.status)
			{
				_user.updatePassword({
					passwordNew:userInfo.ensurePassword,
					passwordOld:userInfo.passwordOld
				},function(data,res){
					_mm.successTips(res);
					window.location.href = './user-center.html';
				},function(errMsg)
				{
					_mm.errorTips(errMsg);
				}); 
			}
			else
			{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	//加载用户信息
	loadUserInfo:function(){
		_user.getUserInfo(function(res){
			 $('#login-username').html(res.username);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	validateForm:function(formData){
		var result = {
			status:1,
			msg:''
		};
		if(!formData.ensurePassword||formData.ensurePassword.length<6)
		{
			result.status =0;
			result.msg = '密码长度不能小于6位';
			return result;
		}
		if(!_mm.validata(formData.passwordOld,'require'))
		{
			result.status =0;
			result.msg = '密码不能为空';
			return result;

		}
		if(!_mm.validata(formData.ensurePassword,'require'))
		{
			result.status =0;
			result.msg = '密码不能为空';
			return result;

		}
		if(formData.password!==formData.ensurePassword)
		{
			result.status =0;
			result.msg = '两次密码必须相同';
			return result;

		}
		return result;
	}
};
$(function(){
	page1.init();
})