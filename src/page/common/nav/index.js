/*
* @Author: Administrator
* @Date:   2017-10-19 21:25:09
* @Last Modified by:   Administrator
* @Last Modified time: 2017-10-24 23:49:50
*/
require('./index.css');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var _cart = require('service/cart-service.js');
//导航
var nav = {
	init:function()
	{
		this.bindEvent();
		this.loadUserInfo();
		this.loadChartCount();
		return this;
	},
	bindEvent:function()
	{

		$('.js-login').click(function(){
			//登录
			_mm.doLogin();
		});
		$('.js-register').click(function(){
			//注册
			window.location.href="./user-register.html"
		});
		$('.js-layout').click(function(){
			//退出
			_user.logout(function(res){
				window.location.reload();
			},function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},//绑定登录注册等事件
	//加载用户信息
	loadUserInfo:function()
	{
		_user.checkLogin(function(res){
			$('.user.not-login').hide().sibling('.user.login').show().find('.username').text(res.username);
				},function(errMsg){
					//do nothing
			});
	},	//加载购物车数量
	loadChartCount:function(){
		_cart.getCartCount(function(res){
			$('.nav .cart-count').text(res||0);
				},function(errMsg){
			$('.nav .cart-count').text(0);

			});
	}
};
module.exports = nav.init();