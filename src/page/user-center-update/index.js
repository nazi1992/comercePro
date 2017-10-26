/*
* @Author: Administrator
* @Date:   2017-10-26 20:33:28
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-27 00:02:49
*/
require('./index.css');
require('page/common/nav/index.js');
require('page/common/header/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

var templateIndex = require('./index.string');
var page = {
	init:function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad:function(){
		//初始化左边菜单
		navSide.init({
			name:'user-center'
		})
		this.loadUserInfo();
	},
	bindEvent:function()
	{
		_this = this;
		$(document).on('click','.btn-submit',function(){
			var userInfo = {
				phone:$.trim($('#phone').val()),				
				email:$.trim($('#email').val()),
				question:$.trim($('#question').val()),
				answer:$.trim($('#answer').val()),


			};
			var validateResult = _this.validateForm(userInfo);

			if(validateResult.status)
			{
				_user.updateUserInfo(userInfo,function(data,res){
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
			userHtml = _mm.renderHtml(templateIndex,res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errorTips(errMsg);
		});
	},
	validateForm:function(formData){
		var result = {
			status:1,
			msg:''
		};
		if(!_mm.validata(formData.phone,'phone'))
		{
			result.msg = '手机号格式不正确';
			result.status =0; 
			return result;

		}if(!_mm.validata(formData.email,'email'))
		{
			result.status =0;
			result.msg = '邮箱格式不正确';
			return result;

		}if(!_mm.validata(formData.question,'require'))
		{
			result.status =0;
			result.msg = '提示问题不能为空';
			return result;

		}
		if(!_mm.validata(formData.answer,'require'))
		{
			result.status =0;
			result.msg = '提示问题答案不能为空';
			return result;

		}
		return result;
	}
};
$(function(){
	page.init();
})